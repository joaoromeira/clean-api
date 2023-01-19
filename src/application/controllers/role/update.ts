import { Request, Response } from 'express';
import { RoleModel } from '@models';

import { logger } from '@logger';

export const update = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  try {
    const { name } = request.body;

    const result = await RoleModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    return response.json(result);
  } catch (err) {
    logger.error(err);
    return response
      .status(500)
      .json({ error: `Can't be update role with id: ${id}.` });
  }
};
