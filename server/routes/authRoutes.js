import express from 'express';
import { adminSignup, adminLogin } from '../controllers/adminController.js';
import { ownerSignup, ownerLogin } from '../controllers/ownerController.js';

const router = express.Router();

// Admin Auth
router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);

// Owner Auth
router.post('/owner/signup', ownerSignup);
router.post('/owner/login', ownerLogin);

export default router;
