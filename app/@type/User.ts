import { UserRoleType } from './UserRoleType';

export type User = {
  name: string;
  password: string;
  role: UserRoleType;
};
