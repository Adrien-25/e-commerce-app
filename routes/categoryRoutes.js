import express from 'express';
import { CategoryController, CreateCategoryController, DeleteCategoryController, SingleCategoryController, UpdateCategoryController } from '../controllers/categoryController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// CREATE CATEGORY || POST 
router.post(
    '/create-category',
    requireSignIn,
    isAdmin,
    CreateCategoryController
);

// UPDATE CATEGORY || PUT 
router.put(
    '/update-category/:id',
    requireSignIn,
    isAdmin,
    UpdateCategoryController
);

// GETALL CATEGORY || GET 
router.get(
    '/get-category',
    CategoryController
);

// SINGLE CATEGORY || GET 
router.get(
    '/single-category/:slug',
    SingleCategoryController
);

// DELETE CATEGORY || DELETE 
router.delete(
    '/delete-category/:id',
    requireSignIn,
    isAdmin,
    DeleteCategoryController
);

export default router;