import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SESSION } from '@constants';
import { Types } from 'mongoose';

interface TokenPayload {
  userId: Types.ObjectId;
  iat: number;
  exp: number;
}

export const ensureAuthentication = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(400)
      .json({ message: 'Authorization header not provided' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const tokenDecoded = verify(token, SESSION.key);
    const { userId } = tokenDecoded as TokenPayload;

    request.userId = userId;

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'JWT error' });
  }
};
