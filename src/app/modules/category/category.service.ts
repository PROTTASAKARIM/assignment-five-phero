import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (userData: JwtPayload,payload: TCategory) => {
  const data={...payload,createdBy:userData._id}
  const result = await Category.create(data);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find().populate('createdBy',{_id:1,username:1,email:1,role:1});
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
