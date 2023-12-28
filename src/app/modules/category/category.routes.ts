import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { categoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constent';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(categoryValidations.categoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategory);

export const CategoryRoutes = router;
