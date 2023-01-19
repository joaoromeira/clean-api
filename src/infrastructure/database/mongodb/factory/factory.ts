import { roleFactory } from './roles';
import { userFactory } from './user';

import { roles, users } from '../data/data';

export const runFactory = async () => {
  await roleFactory(roles);
  await userFactory(users);
};
