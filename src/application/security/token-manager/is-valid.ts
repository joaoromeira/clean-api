import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { SESSION } from '@constants';

interface Args {
  token: string;
  expires: number;
}

export const tokenIsValid = ({ token, expires }: Args) => {
  return (
    jwt.verify(token, SESSION.key) && dayjs().isBefore(dayjs.unix(expires))
  );
};
