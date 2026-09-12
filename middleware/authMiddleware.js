import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: "Access denied. Authorization header missing."
            });
        }

        // Expected format:
        // Authorization: Bearer <token>
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                error: "Access denied. Invalid authorization format."
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: "Access denied. No token provided."
            });
        }

        // Make sure JWT secret exists
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not configured.");

            return res.status(500).json({
                success: false,
                error: "Server authentication configuration error."
            });
        }

        // Verify JWT
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            console.error("JWT verification failed:", jwtError.message);

            return res.status(401).json({
                success: false,
                error: "Invalid or expired token."
            });
        }

        // Find user
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "User associated with this token was not found."
            });
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        console.error("Error in auth middleware:", error);

        return res.status(500).json({
            success: false,
            error: "Authentication server error."
        });
    }
};

export default authMiddleware;
