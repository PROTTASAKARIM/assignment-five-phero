import { JwtPayload } from 'jsonwebtoken';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (userData: JwtPayload,payload: TReview) => {
  console.log(payload);
  const data={...payload,createdBy:userData._id}
  const result = await Review.create(data);
  const populatedResult= await Review.findById(result._id).populate('createdBy',{_id:1,username:1,email:1,role:1})
  return populatedResult;
};
const getAllReviewsFromDB = async () => {
  const result = await Review.find();
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
};
