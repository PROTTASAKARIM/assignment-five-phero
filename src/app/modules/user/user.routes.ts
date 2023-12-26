import express from 'express';
import { UserControllers } from './user.controller';
import { userValidations } from './user.validation';
import validateRequest from '../../middlewares/validateRequests';
import cryptPassword from '../../middlewares/passwordCrypt';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  cryptPassword,
  UserControllers.createUser,
);
router.post(
    '/login',
    UserControllers.loginUser
)

export const UserRoutes = router;
