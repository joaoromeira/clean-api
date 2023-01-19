import { Router } from 'express';
import { all, find } from '@controllers/permission';

const router = Router();

/**
 * Get
 */
router.get('/all', all);
router.get('/find/:id', find);

export default router;
