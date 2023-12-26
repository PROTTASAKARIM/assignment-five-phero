import express from 'express';
// import validateRequest from '../../middlewares/validateRequests';
// import { reviewValidation } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post(
  '/',
  // validateRequest(reviewValidation.reviewValidationSchema),
  ReviewControllers.createReview,
);

router.get('/', ReviewControllers.getAllReviews);

export const ReviewRoutes = router;
