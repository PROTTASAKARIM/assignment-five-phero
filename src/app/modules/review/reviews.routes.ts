import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { reviewValidation } from './review.validation';
import { ReviewControllers } from './review.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constent';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(reviewValidation.reviewValidationSchema),
  ReviewControllers.createReview,
);

router.get('/', ReviewControllers.getAllReviews);

export const ReviewRoutes = router;
