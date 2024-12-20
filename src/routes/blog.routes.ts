// src/routes/blog.routes.ts
import express, { Router } from 'express';
import * as blogController from '../controllers/blog.controller';
import { auth } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/', auth, blogController.createBlog);
router.patch('/:id', auth, blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);
router.get('/', blogController.getBlogs);

export default router;