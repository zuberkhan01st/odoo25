import express from 'express';
import { adminSignup, adminLogin } from '../controllers/adminController.js';
import { ownerSignup, ownerLogin } from '../controllers/ownerController.js';
import {login, signup} from '../controllers/userController.js';

const router = express.Router();

// Admin Auth
router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);

// Owner Auth
router.post('/owner/signup', ownerSignup);
router.post('/owner/login', ownerLogin);

//User Auth
router.post('/user/login',login);
router.post('/user/signup',signup);

export default router;
