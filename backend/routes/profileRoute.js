import express from 'express';
import { getProfile, updateEmail, updatePassword, updateProfile, deleteAccount } from '../controllers/profileHandler.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.patch('/profile', authMiddleware, updateProfile);
router.patch('/profile/email', authMiddleware, updateEmail);
router.patch('/profile/password', authMiddleware, updatePassword);
router.delete('/delete', authMiddleware, deleteAccount);

export default router;