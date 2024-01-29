import { Types } from "mongoose";

export type TProduct = {
  name: string;
  modelNo: string;
  opratingSystem: string;
  connectivity: string;
  powerSource: string;
  compatibility: string;
  modelYear: Date;
  price: number;
  quantity: number;
  weight: number;
  dimensions: number;
  brandName: string;
  createdBy: Types.ObjectId;
  releaseDate: Date;
  updatedAt?: Date;
};
