import { Request, Response } from 'express';
import { UserModel } from '@models';
import { logger } from '@logger';
import { Login } from '@dtos/authentication-controller';
import { generateOrRefreshToken } from '@security/token-manager';
import { compare } from '@security/encrypt';

export const login = async (
  request: Request<any, any, Login>,
  response: Response
): Promise<Response> => {
  try {
    const { email, password } = request.body;

    const user = await UserModel.findOne({
      email,
    })
      .select('+password')
      .populate('role');

    if (!compare(password, user.password)) {
      return response
        .status(401)
        .json({ error: 'Password or e-mail is invalid' });
    }

    const authorization = await generateOrRefreshToken({
      userId: user.id,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      authorization,
    });
  } catch (err) {
    logger.error(err);
    return response.status(500).json({ error: "Can't be make login." });
  }
};
