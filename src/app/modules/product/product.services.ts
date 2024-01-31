import httpStatus from "http-status";
import AppError from "../../errors/Apperror";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: Partial<TProduct>) => {
    const result = await Product.create(payload);
    return result;
};
const getAllProductsFromDB = async () => {
    const result = await Product.find();
    return result;
};
const getOneProductFromDB = async (id: any) => {
    const result = await Product.findById(id);
    return result;
};
const updateOneProductFromDB = async (id: any, payload: Partial<TProduct>) => {
    try {
        console.log(id, payload)
        const result = await Product.findByIdAndUpdate(
            id,
            payload,
            { new: true }
        );
        return result;
    } catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Product');
    }
};


export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getOneProductFromDB,
    updateOneProductFromDB
};