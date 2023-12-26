import httpStatus from 'http-status';
import AppError from '../../errors/Apperror';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import bcrypt from 'bcrypt'
import { createToken } from './user.utilies';

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  console.log("payload",payload)
  const username = payload.username;
  const password = payload.password;
  const user = await User.findOne({ username: username },{username:1,password:1,role:1,email:1});
  console.log('user',user)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
 
  const match = await bcrypt.compare(password, user.password);
  if(!match){
    throw new AppError(httpStatus.NOT_FOUND, 'Give Correct Password');
  }
  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email:user.email
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  console.log(accessToken)

  return null
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
