import { Router } from 'express';
import { CategoryRoutes } from '../modules/category/category.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { ReviewRoutes } from '../modules/review/reviews.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/',
    route: CourseRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
