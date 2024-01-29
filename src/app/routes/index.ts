import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { ProductRoutes } from '../modules/product/product.routes';

const router = Router();

const moduleRoutes = [

  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
