import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from "slugify";

export const CreateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Requiered' })
            case !description:
                return res.status(500).send({ error: 'Description is Requiered' })
            case !price:
                return res.status(500).send({ error: 'Price is Requiered' })
            case !category:
                return res.status(500).send({ error: 'Category is Requiered' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is Requiered' })
            case !photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: 'Photo is Requiered and should be less than 1 Mo' })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully',
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Creating Product"
        })
    }
}

// Update category
export const UpdateProductController = async (req, res) => {
    try {
        console.log(req.params);
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        console.log("req = " + req.fields);

        //Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Requiered' })
            case !description:
                return res.status(500).send({ error: 'Description is Requiered' })
            case !price:
                return res.status(500).send({ error: 'Price is Requiered' })
            case !category:
                return res.status(500).send({ error: 'Category is Requiered' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is Requiered' })
            case !photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: 'Photo is Requiered and should be less than 1 Mo' })
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.id,
            { ...req.fields, slug: slugify(name) },
            { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product Updated Successfully',
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updating Product"
        })
    }
};

// Get All Products
export const ProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'All Products List',
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Getting All Products'
        })
    }
}

// Get Single Product
export const SingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate('category')
        res.status(200).send({
            success: true,
            message: "Get Single Product Successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Getting Product'
        })
    }
}

// Get Product Photo
export const ProductPhotoController = async (req, res) => {
    try {
        const product = await productModel
            .findById(req.params.id)
            .select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
        res.status(200).send({
            success: true,
            message: "Get Single Product Successfully",
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Getting Photo'
        })
    }
}

// Delete Product 
export const DeleteProductController = async (req, res) => {
    try {
        const product = await productModel
            .findByIdAndDelete(req.params.id)
            .select("-photo")

        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Deleting Photo'
        })
    }
}

//filters
export const productFiltersController = async (req, res) => {
    try {
        console.log(req.body);
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Filtering Products'
        })
    }
}