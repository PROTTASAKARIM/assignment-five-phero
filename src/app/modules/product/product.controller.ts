import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.services";

const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProductIntoDB(req.body);


    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Product created successfully',
        data: result,
    });
});
const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProductsFromDB();


    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Products retrived successfully',
        data: result,
    });
});

export const ProductControllers = {
    createProduct,
    getAllProducts

};