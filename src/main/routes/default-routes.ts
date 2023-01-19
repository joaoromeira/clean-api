import { Router, Request, Response } from 'express';

const router = Router();

/**
 * Root
 */
router.get('/', (request: Request, response: Response) => {
  return response.json({
    message: 'API V1',
  });
});

/**
 * 404 routes
 */
router.get('*', async (request: Request, response: Response) => {
  return response.status(404).json({
    message: '404 Not Found',
  });
});

export default router;
