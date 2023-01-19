import { Request, Response } from 'express';
import { UserModel } from '@models';

import { logger } from '@logger';

export const all = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const result = await UserModel.find().populate('role');

    return response.json(result);
  } catch (err) {
    logger.error(err);
    return response.status(500).json({ error: `Can't retrieve all users.` });
  }
};
