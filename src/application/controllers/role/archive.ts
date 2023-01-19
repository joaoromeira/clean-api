import { Request, Response } from 'express';
import { RoleModel } from '@models';

import { logger } from '@logger';

export const archive = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  try {
    const result = await RoleModel.findByIdAndUpdate(
      id,
      {
        isArchived: true,
      },
      { new: true }
    );

    return response.json(result);
  } catch (err) {
    logger.error(err);
    return response
      .status(500)
      .json({ error: `Can't be archive role with id: ${id}.` });
  }
};
