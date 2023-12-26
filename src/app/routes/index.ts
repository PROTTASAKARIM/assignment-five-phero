import { Router } from 'express';
import { CategoryRoutes } from '../modules/category/category.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { ReviewRoutes } from '../modules/review/reviews.routes';
import { UserRoutes } from '../modules/user/user.routes';

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
  {
    path: '/auth',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
