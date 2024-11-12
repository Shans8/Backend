import express from 'express';
import userRouter from './users.routes.js';
import roleRouter from './roles.routes.js';
import profileRouter from './profiles.routes.js';
import { errorHandler } from "../middlewares/errorHandler.js";
const router = express.Router();

router.use('/roles', roleRouter);
router.use('/users', userRouter);
router.use('/profiles', profileRouter);

router.use(errorHandler);
export default router;