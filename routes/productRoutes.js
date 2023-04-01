import express from 'express';
import { CreateProductController, DeleteProductController, productCategoryController, ProductController, productCountController, productFiltersController, productListController, ProductPhotoController, relatedProductController, searchProductController, SingleProductController, UpdateProductController } from '../controllers/productController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

// CREATE PRODUCT || POST 
router.post(
    '/create-product',
    requireSignIn,
    isAdmin,
    formidable(),
    CreateProductController
);

// UPDATE PRODUCT || PUT 
router.put(
    '/update-product/:id',
    requireSignIn,
    isAdmin,
    formidable(),
    UpdateProductController
);

// GETALL PRODUCT || GET 
router.get(
    '/get-product',
    ProductController
);

// SINGLE PRODUCT || GET 
router.get(
    '/single-product/:slug',
    SingleProductController
);

// SINGLE PHOTO || GET 
router.get(
    '/product-photo/:id',
    ProductPhotoController
);

// DELETE PRODUCT || DELETE 
router.delete(
    '/delete-product/:id',
    requireSignIn,
    isAdmin,
    DeleteProductController
);

// FILTER PRODUCT || POST 
router.post(
    '/product-filters',
    productFiltersController
);

// COUNT PRODUCT || GET 
router.get(
    '/product-count',
    productCountController
);

// PRODUCT PER PAGE || GET 
router.get(
    '/product-list/:page',
    productListController
);

// SEARCH PRODUCT || GET 
router.get(
    '/search/:keyword',
    searchProductController
);

// SIMILAR PRODUCT || GET 
router.get(
    '/related-product/:pid/:cid',
    relatedProductController
);

// CATEGORY WISE PRODUCT || GET 
router.get(
    '/product-category/:slug',
    productCategoryController
);

export default router;