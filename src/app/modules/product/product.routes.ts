import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { productValidations } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post(
    '/',
    validateRequest(productValidations.productValidationSchema),
    ProductControllers.createProduct,
);
router.get(
    '/',
    ProductControllers.getAllProducts,
);
router.get(
    '/:id',
    ProductControllers.getOneProduct,
);
router.put(
    '/:id',
    ProductControllers.updateOneProduct,
);

export const ProductRoutes = router;