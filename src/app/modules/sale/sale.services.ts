import mongoose from "mongoose";
import { TSale } from "./sale.interface";
import { Sale } from "./sale.model";
import { Product } from "../product/product.model";

const createSaleIntoDB = async (payload: Partial<TSale>) => {
    const session = await mongoose.startSession();
    try {
        const sale = await session.withTransaction(async () => {
            const result = await Sale.create(payload);
            return result;
        });
        const product = await Product.findById(payload.product)
        // const quantity =

    } catch (err) {
        console.log(err)
    }
};



export const SaleServices = {
    createSaleIntoDB
};