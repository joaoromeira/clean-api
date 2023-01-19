import { Request, Response } from 'express';
import { PermissionModel } from '@models';

import { logger } from '@logger';

export const find = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  try {
    const result = await PermissionModel.findById(id);

    return response.json(result);
  } catch (err) {
    logger.error(err);
    return response
      .status(500)
      .json({ error: `Can't retrieve find permission with id: ${id}.` });
  }
};
