import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { categoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidations.categoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategory);

export const CategoryRoutes = router;
