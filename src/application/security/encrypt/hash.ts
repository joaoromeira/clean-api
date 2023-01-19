import bcrypt from 'bcryptjs';

export const hash = (value: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
};
