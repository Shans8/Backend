import express from 'express';
import { commentController } from '../controllers/comments.controller.js';
const router = express.Router();


router.post('/', commentController.addComment);
router.get('/', commentController.getComment);

export default router;