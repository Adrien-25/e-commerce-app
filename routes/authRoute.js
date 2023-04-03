import express from 'express';
import { registerController, loginController, testController, forgotPasswordController, updateProfileController } from "../controllers/authController.js"
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

// FORGOT PASSWORD || POST 
router.post('/forgot-password', forgotPasswordController);

// TEST ROUTE || GET 
router.get('/test', requireSignIn, isAdmin, testController);

// PROTECTED USER ROUTE AUTH || GET 
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// PROTECTED ADMIN ROUTE AUTH || GET 
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

// UPDATE PROFILE || GET 
router.put('/profile', requireSignIn, updateProfileController);


export default router;