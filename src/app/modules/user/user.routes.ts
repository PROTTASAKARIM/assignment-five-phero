import express from 'express';
import { UserControllers } from './user.controller';
import { userValidations } from './user.validation';
import validateRequest from '../../middlewares/validateRequests';
import cryptPassword from '../../middlewares/passwordCrypt';
import { USER_ROLE } from './user.constent';
import auth from '../../middlewares/auth';

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
router.post(
    '/change-password',
    auth(USER_ROLE.admin,USER_ROLE.user),
    UserControllers.changePassword
)

export const UserRoutes = router;
