import Category from "../models/Category.js";

const addCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;

        // Validation check for empty name
        if (!categoryName || categoryName.trim() === "") {
            return res.status(400).json({ success: false, error: "Category name is required" });
        }

        // Trim whitespace to prevent duplicates like "LCD" vs "LCD "
        const trimmedName = categoryName.trim();
        const trimmedDesc = categoryDescription ? categoryDescription.trim() : "";

        // Check if category already exists
        const existingCategory = await Category.findOne({ categoryName: trimmedName });
        if (existingCategory) {
            return res.status(400).json({ success: false, error: "Category already exists" });
        }

        // Create and save the new category
        const newCategory = new Category({
            categoryName: trimmedName,
            categoryDescription: trimmedDesc
        });

        await newCategory.save();
        
        return res.status(201).json({ 
            success: true, 
            message: "Category added successfully", 
            category: newCategory 
        });
        
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getCategories = async (req,res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ success: true, categories});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message});
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, categoryDescription } = req.body;

        // Validation check for empty name
        if (!categoryName || categoryName.trim() === "") {
            return res.status(400).json({ success: false, error: "Category name is required" });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { categoryName: categoryName.trim(), categoryDescription: categoryDescription ? categoryDescription.trim() : "" },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, error: "Category not found" });
        }

        return res.status(200).json({ success: true, category: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ success: false, error: "Category not found" });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Category deleted successfully" 
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export { addCategory, getCategories, updateCategory, deleteCategory };