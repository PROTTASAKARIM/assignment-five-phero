import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  console.log(payload);
  const result = await Review.create(payload);
  return result;
};
const getAllReviewsFromDB = async () => {
  const result = await Review.find();
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
};
