import { Request, Response } from 'express';
import { RoleModel } from '@models';

import { logger } from '@logger';

export const save = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.body;

    const result = await new RoleModel({ name, isOficial: true }).save();

    return response.json(result);
  } catch (err) {
    logger.error(err);
    return response.status(500).json({ error: `Can't be save role.` });
  }
};
