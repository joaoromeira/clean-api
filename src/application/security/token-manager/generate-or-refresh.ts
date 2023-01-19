import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { AuthTokenModel } from '@models';
import { SESSION } from '@constants';
import { logger } from '@logger';
import { Types } from 'mongoose';
import { tokenIsValid } from './is-valid';

interface Result {
  token: string;
  expires: number;
}

interface Args {
  userId: string | Types.ObjectId;
}

export const generateOrRefreshToken = async ({
  userId,
}: Args): Promise<Result> => {
  try {
    const existToken = await AuthTokenModel.findOne({
      createdBy: userId,
    });

    // Verify if is valid (key and time)
    if (existToken && tokenIsValid(existToken)) {
      return {
        token: existToken.token,
        expires: existToken.expires,
      };
    }

    try {
      await AuthTokenModel.deleteOne({
        createdBy: userId,
      });

      // Calc when expires
      const expires = dayjs()
        .add(Number(SESSION.lifetime?.replace('d', '')), 'day')
        .unix();

      // Generate token
      const token = jwt.sign({ userId }, process.env.JWT_SESSION_KEY!, {
        expiresIn: expires,
      });

      // Create and save
      const newToken = await new AuthTokenModel({
        token,
        expires,
        createdBy: userId,
      }).save();

      return {
        token: newToken.token,
        expires: newToken.expires,
      };
    } catch (err) {
      logger.error(err);
      throw new Error(`Session token can't be created`);
    }
  } catch (err) {
    logger.error(err);
    throw new Error(`Can't retrieve session token`);
  }
};
