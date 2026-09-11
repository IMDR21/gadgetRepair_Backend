import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category")  
            .populate("supplier"); 

        return res.status(200).json({ 
            success: true, 
            products 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { productName, category, supplier, price, stock, description } = req.body;
        
        if (!productName || !category || price === undefined || stock === undefined) {
            return res.status(400).json({ success: false, error: "Please fill all required fields" });
        }

        const newProduct = new Product({ 
            productName, 
            category, 
            supplier: supplier || null, 
            price, 
            stock, 
            description 
        });
        
        await newProduct.save();

        // Populate so the frontend receives names instantly
        const populatedProduct = await Product.findById(newProduct._id).populate("category supplier");

        return res.status(201).json({ 
            success: true, 
            message: "Product added successfully", 
            product: populatedProduct 
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true }
        ).populate("category supplier");

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Product updated successfully", 
            product: updatedProduct 
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};