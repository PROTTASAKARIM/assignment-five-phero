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
const getOneProduct = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await ProductServices.getOneProductFromDB(id);


    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Product retrived successfully',
        data: result,
    });
});
const updateOneProduct = catchAsync(async (req, res) => {
    const id = req.params.id
    const product = req.body;
    const updatedProduct = { ...product, price: parseFloat(product.price), quantity: parseFloat(product.quantity) }
    delete updatedProduct._id
    delete updatedProduct.createdAt
    delete updatedProduct.updatedAt
    // delete updatedProduct.releaseDate
    // delete updatedProduct.modelYear

    console.log(updatedProduct)

    const result = await ProductServices.updateOneProductFromDB(id, updatedProduct);


    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Product update successfully',
        data: result,
    });
});
export const ProductControllers = {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateOneProduct
};