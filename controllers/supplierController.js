import Supplier from "../models/Supplier.js";

export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        return res.status(200).json({ success: true, suppliers });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const addSupplier = async (req, res) => {
    try {
        const { supplierName, contactPerson, phone, email, address } = req.body;
        if (!supplierName || supplierName.trim() === "") {
            return res.status(400).json({ success: false, error: "Supplier name is required" });
        }

        const newSupplier = new Supplier({ supplierName, contactPerson, phone, email, address });
        await newSupplier.save();

        return res.status(201).json({ success: true, message: "Supplier added successfully", supplier: newSupplier });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ success: true, message: "Supplier updated successfully", supplier: updatedSupplier });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        await Supplier.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Supplier deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};