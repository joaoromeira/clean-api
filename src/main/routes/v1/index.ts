import { Router } from 'express';

import { ensureAuthentication } from '@security/token-manager';

import authentication from './authentication';
import permission from './permission';
import role from './role';
import user from './user';

const router = Router();

/**
 * Public routers
 */
router.use('/authentication', authentication);

// Token needed ahead
router.use(ensureAuthentication);

/**
 * Security routers
 */
router.use('/permission', permission);
router.use('/role', role);
router.use('/user', user);

export default router;
