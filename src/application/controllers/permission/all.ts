import { Request, Response } from 'express';
import { PermissionModel } from '@models';

import { logger } from '@logger';

export const all = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { page = 1, limit = 10 }: Paginate = request.query;

    const permissions = await PermissionModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await PermissionModel.countDocuments();

    return response.json({
      permissions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    logger.error(err);
    return response
      .status(500)
      .json({ error: `Can't retrieve all permissions.` });
  }
};
