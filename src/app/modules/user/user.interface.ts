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
