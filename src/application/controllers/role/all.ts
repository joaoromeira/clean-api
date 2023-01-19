import { Request, Response } from 'express';
import { RoleModel } from '@models';

import { logger } from '@logger';

export const all = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { page = 1, limit = 10 }: Paginate = request.query;

    const roles = await RoleModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await RoleModel.countDocuments();

    return response.json({
      roles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    logger.error(err);
    return response.status(500).json({ error: `Can't retrieve all roles.` });
  }
};
