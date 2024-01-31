import { Types } from "mongoose";

export type TSale = {
    customer: string;
    saleDate: Date;
    quantity: number;
    product: Types.ObjectId;
};