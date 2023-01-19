import { Router } from 'express';

import defaultRoutes from './default-routes';
import v1Routes from './v1';

const router = Router();

// Import v1 routes
router.use(`/v1`, v1Routes);

router.use(defaultRoutes);

export default router;
