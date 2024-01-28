import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  const showResult = {
    _id: result._id,
    username: result.username,
    // email: result.email,
    role: result.role,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: showResult,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successful',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await UserServices.changePassword(req.user, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password changed successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
  changePassword,
};
