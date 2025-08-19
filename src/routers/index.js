import { Router } from 'express';
import recipesRouter from './recipes.js';
import authRouter from './auth.js';
import userRouter from './user.js';
import miscRouter from './misc.js';

const router = Router();

router.use('/recipes', recipesRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use(miscRouter);

export default router;
