import express from 'express';
import { userController } from '../controllers/users.controller.js';
import { postController } from '../controllers/posts.controller.js';
import { commentController } from '../controllers/comments.controller.js';
const router = express.Router();

router.post('/users', userController.addUser);
router.get('/users', userController.getUser);
router.get('/users/:id',userController.findUser);
router.get('/users/:id/posts', userController.getUserPost);

router.post('/posts', postController.addPost);
router.get('/posts', postController.getPost);
router.get('/posts/:id', postController.findPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

router.post('/comments', commentController.addComment);
router.get('/comments', commentController.getComment);


export default router;