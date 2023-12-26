import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.services';

const createReview = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await ReviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Review is created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews are retrieved successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
};
