import { UserInterface } from '@models';

export interface UsersDataInterface extends UserInterface {
  roleName: string;
}

export const users = [
  {
    email: 'system@drh.com',
    name: 'Sistema',
    password: '123456',
    roleName: 'System',
  },
  { email: 'jv@drh.com', name: 'João', password: '123456', roleName: 'Admin' },
] as UsersDataInterface[];
