import { RoleModel, UserModel } from '@models';
import { hash } from '@security/encrypt';

import { UsersDataInterface } from '../data/users';

export const userFactory = async (users: UsersDataInterface[]) => {
  const getRoleByName = async (name: string) => {
    const role = await RoleModel.findOne(
      {},
      {
        name,
      }
    );

    return role._id || '';
  };

  const usersWithPasswordHashed = await Promise.all(
    users.map(async (data) => ({
      ...data,
      isConfirmed: true,
      password: hash(data.password),
      role: await getRoleByName(data.roleName),
    }))
  );

  await UserModel.insertMany(usersWithPasswordHashed);
};
