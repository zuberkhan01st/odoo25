import express from 'express';
import { getAIRecommendations } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// AI Recommendation endpoint (POST for current booking context)
router.post('/ai/recommend', protect, getAIRecommendations);

export default router;
