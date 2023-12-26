import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { courseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import calculateBetweenWeeks from '../../middlewares/weeksCalculation';

const router = express.Router();

router.post(
  '/course',
  calculateBetweenWeeks,
  validateRequest(courseValidations.courseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/courses', CourseControllers.getAllCourse);
router.get('/courses/:courseId/reviews', CourseControllers.getOneCourseReviews);
router.get('/course/best', CourseControllers.getBestCourseOnRatings);

router.put('/courses/:courseId',calculateBetweenWeeks, validateRequest(courseValidations.courseValidationUpdateSchema), CourseControllers.updateCourse);

export const CourseRoutes = router;
