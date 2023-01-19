import { Request, Response } from 'express';
import { AuthTokenModel } from '@models';
import { logger } from '@logger';
import { generateOrRefreshToken } from '@security/token-manager';

export const refresh = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { authorization } = request.headers;

    const token = authorization.replace('Bearer', '').trim();
    const authToken = await AuthTokenModel.findOne({
      token,
    });

    const refreshedAuthorization = await generateOrRefreshToken({
      userId: authToken.createdBy,
    });

    return response.status(201).json({
      authorization: refreshedAuthorization,
    });
  } catch (err) {
    logger.error(err);
    return response.status(500).json({ error: "Can't be refresh token." });
  }
};
