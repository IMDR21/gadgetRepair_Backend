import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, error: "Access denied. No token provided." });
        }
        // Here you would typically verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({success: false, error: "Invalid token."});
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, error: "User not found."});
        }
        next();
    } catch (error) {
        console.error("Error in auth middleware", error);
        res.status(500).json({ success: false, error: error.message });
    }
 }

 export default authMiddleware;