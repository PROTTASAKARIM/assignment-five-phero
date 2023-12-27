import httpStatus from "http-status";
import AppError from "../errors/Apperror";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from "../modules/user/user.interface";
import { NextFunction, Request, Response } from "express";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      // checking if the token is missing
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
  
      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
  
    //   const { role, userId, iat } = decoded;
  
     
 console.log(requiredRoles)
 console.log(decoded)
  
     
      next();
    });
  };
  export default auth;