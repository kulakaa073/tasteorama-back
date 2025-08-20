import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { getUserDataController } from '../controllers/user.js';

const router = Router();

router.get('/me', authenticate, ctrlWrapper(getUserDataController));

export default router;
