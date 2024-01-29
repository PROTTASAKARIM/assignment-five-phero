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

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB
};