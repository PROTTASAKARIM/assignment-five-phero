import httpStatus from 'http-status';
import AppError from '../errors/Apperror';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import { NextFunction, Request, Response } from 'express';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { _id, role, iat } = decoded;

    const matchedUser = await User.findById(_id);

    console.log('matchedUser', matchedUser);
    console.log(requiredRoles);

    if (!matchedUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    const passwordChangeTime = matchedUser?.passwordChangedAt?.getTime();
    if (matchedUser?.passwordChangedAt) {
      if (iat !== undefined) {
        if ((passwordChangeTime as number) > iat) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'Please Login again');
        }
      }
    }

    console.log('time', matchedUser?.createdAt?.getTime());

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};
export default auth;
