import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: true 
    },
    supplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Supplier" 
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;