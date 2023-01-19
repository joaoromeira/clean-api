import { Router } from 'express';
import { login, refresh } from '@controllers/authentication';

const router = Router();

/**
 * Post
 */
router.post('/login', login);
router.post('/refresh', refresh);

export default router;
