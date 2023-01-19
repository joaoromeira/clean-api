import bcrypt from 'bcryptjs';

export const compare = (value: string, hash: string) => {
  return bcrypt.compareSync(value, hash);
};
