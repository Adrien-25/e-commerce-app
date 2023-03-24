import express from 'express';
import { registerController, loginController, testController } from "../controllers/authController.js"
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

// routing
// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

// test routes
router.get('/test', requireSignIn, isAdmin, testController);

// PROTEXTED ROUTE AUTH
router.get('/user-auth', requireSignIn, (req, res) => {
    console.log("test de connexion : " + res);
    res.status(200).send({ ok: true });
})

export default router;