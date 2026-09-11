import express from "express";
import { 
    getSuppliers, 
    addSupplier, 
    updateSupplier, 
    deleteSupplier 
} from "../controllers/supplierController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getSuppliers);
router.post("/add", authMiddleware, addSupplier);
router.put("/:id", authMiddleware, updateSupplier);
router.delete("/:id", authMiddleware, deleteSupplier);

export default router;