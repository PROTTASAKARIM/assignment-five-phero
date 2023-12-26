import httpStatus from 'http-status';
import AppError from '../../errors/Apperror';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import bcrypt from 'bcrypt'

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  console.log("payload",payload)
  const username = payload.username;
  const password = payload.username;
  const user = await User.findOne({ username: username },{username:1,password:1});
  console.log('user',user)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const hashPassword= await bcrypt.hash( password,Number(config.bcrypt_salt_rounds))
  if(user.password!==hashPassword){
    throw new AppError(httpStatus.NOT_FOUND, 'Give Correct Password');
  }
  

  return null
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
