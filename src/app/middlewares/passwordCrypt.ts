import { NextFunction, Request, Response } from 'express';
import config from '../config';
import bcrypt from 'bcrypt';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cryptPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updatedData = req.body;
  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(
      updatedData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  req.body = updatedData;
  next();
};

export default cryptPassword;
