
// src/routes/admin.routes.ts
import express from 'express';
import * as adminController from '../controllers/admin.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.patch('/users/:userId/block', auth, adminAuth, adminController.blockUser);
router.delete('/blogs/:id', auth, adminAuth, adminController.adminDeleteBlog);

export default router;