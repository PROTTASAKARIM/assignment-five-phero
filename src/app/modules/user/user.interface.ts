import { USER_ROLE } from "./user.constent";

export type TPreviousPassword = {
  password: string;
  changeTime: Date;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  previousPassword?: TPreviousPassword[];
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TLoginUser = {
  username: string;
  password: string;
};
export type TChangePassword = {
  currentPassword: string;
  newPassword: string;
};

export type TUserRole = keyof typeof USER_ROLE;
