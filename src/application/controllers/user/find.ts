import { Request, Response } from 'express';
import { UserModel } from '@models';

import { logger } from '@logger';

export const find = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  try {
    const result = await UserModel.findOne({ _id: id }).populate('role');

    return response.json(result);
  } catch (err) {
    logger.error(err);
    return response
      .status(500)
      .json({ error: `Can't retrieve find user with id: ${id}.` });
  }
};
