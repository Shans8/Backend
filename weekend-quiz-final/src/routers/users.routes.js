import express from 'express';
import { userController } from "../controllers/users.controllers.js";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getUser);
router.get('/:id', userController.getUserId);
router.put('/:id', authentication, authorization, userController.updateUser);
router.delete('/:id', authentication, authorization, userController.deleteUser);

export default router;