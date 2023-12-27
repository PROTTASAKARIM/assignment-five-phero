import httpStatus from 'http-status';
import AppError from '../../errors/Apperror';
import { TChangePassword, TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './user.utilies';
import { JwtPayload } from 'jsonwebtoken';

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  console.log('payload', payload);
  const username = payload.username;
  const password = payload.password;
  const user = await User.findOne(
    { username: username },
    { username: 1, password: 1, role: 1, email: 1 },
  );
  console.log('user', user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError(httpStatus.NOT_FOUND, 'Give Correct Password');
  }
  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  console.log(accessToken);

  const userDetails = {
    _id: user._id,
    username: user.username,
    role: user.role,
    email: user.email,
  };

  return { user: userDetails, token: accessToken };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  console.log('payload', payload);
  console.log('userData', userData);
  const userDetails = await User.findById(userData._id, {
    _id: 1,
    username: 1,
    email: 1,
    password: 1,
    role: 1,
    previousPassword: 1,
    passwordChangedAt: 1,
    createdAt: 1,
    updatedAt: 1,
  });
  console.log('userDetails', userDetails);
  if (!userDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const match = await bcrypt.compare(
    payload.currentPassword,
    userDetails.password,
  );
  if (!match) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Current password didn't matched ! Give Correct Password`,
    );
  }

  const previousPasswordsMatching = userDetails?.previousPassword?.length;

  if (
    previousPasswordsMatching !== undefined &&
    (previousPasswordsMatching >= 1 || previousPasswordsMatching <= 2)
  ) {
    userDetails?.previousPassword?.map(async (prevPassword) => {
      const match = await bcrypt.compare(
        payload.currentPassword,
        prevPassword.password,
      );
      if (match) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          `You Can not Use the Last 2 Passwords. Give Another Password`,
        );
      }
    });
  }

  const matchNewPassword = await bcrypt.compare(
    payload.newPassword,
    userDetails.password,
  );
  if (matchNewPassword) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `You Can not Use the same Password. Give a new Password`,
    );
  }

  const newPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  const passwordChangedAt = new Date();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let newPreviousPasswords :any = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prev: any = {
      password: userDetails.password,
      changeTime: passwordChangedAt ? passwordChangedAt : userDetails.createdAt,
    };

  if (
    previousPasswordsMatching !== undefined &&
    previousPasswordsMatching === 2
  ) {
    const previousPasswordArray = userDetails.previousPassword;
    previousPasswordArray?.shift();
  

    previousPasswordArray?.push(prev);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    newPreviousPasswords=previousPasswordArray;
  }else{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    newPreviousPasswords=[prev]
  }

const updatedData={
  password:newPassword,
  passwordChangedAt: new Date(),
  previousPassword:newPreviousPasswords
}

const update= await User.findByIdAndUpdate(userData._id,updatedData)
return update

};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  changePassword,
};
