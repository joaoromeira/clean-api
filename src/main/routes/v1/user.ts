import { Router } from 'express';
import { all, archive, find, save, unarchive, update } from '@controllers/user';

const router = Router();

/**
 * Get
 */
router.get('/all', all);
router.get('/find/:id', find);
/**
 * Post
 */
router.post('/save', save);
/**
 * Put
 */
router.put('/archive/:id', archive);
router.put('/unarchive/:id', unarchive);
router.put('/update/:id', update);

export default router;
