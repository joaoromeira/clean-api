import { RoleInterface, RoleModel } from '@models';

export const roleFactory = async (roles: RoleInterface[]) => {
  await RoleModel.insertMany(roles);
};
