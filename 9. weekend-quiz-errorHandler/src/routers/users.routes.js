import express from 'express';
import { userController } from '../controllers/users.controller.js';
const router = express.Router();

router.post('/', userController.addUser);
router.get('/', userController.getUser);
router.get('/:id',userController.findUser);
router.get('/:id/posts', userController.getUserPost);

export default router;
