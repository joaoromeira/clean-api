import { Request, Response } from 'express';
import { UserModel } from '@models';

import { logger } from '@logger';

export const save = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.body;

    const result = await new UserModel({ name }).save();

    return response.json(result);
  } catch (err) {
    logger.error(err);
    return response.status(500).json({ error: `Can't be save user.` });
  }
};
