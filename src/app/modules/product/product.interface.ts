import { Types } from "mongoose";

export type TProduct = {
  name: string;
  modelNo: string;
  price: number;
  qty: number;
  brandName: Types.ObjectId;
  createdBy: Types.ObjectId;
  releaseDate: Date;
  updatedAt?: Date;
};
