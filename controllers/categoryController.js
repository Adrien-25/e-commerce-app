import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

// Create Category 
export const CreateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is requiered' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exist'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: 'new Category Created Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Creating Category'
        })
    }
};

// Update category
export const UpdateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(201).send({
            success: true,
            message: 'new Category Created Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Updating Category'
        })
    }
};

// Get All Cateogy
export const CategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'All Categories List',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Getting All Categories'
        })
    }
}
// Single Cateogy
export const SingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne(
            { slug: req.params.slug }
        );
        res.status(201).send({
            success: true,
            message: 'Get Single Category Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Getting Category'
        })
    }
}
// delete Cateogy
export const DeleteCategoryController = async (req, res) => {
    console.log(req.params);
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(201).send({
            success: true,
            message: 'Category Deleted Successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Deleting Category'
        })
    }
}
