import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.services';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CourseServices.getAllCoursesFromDB(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getOneCourseReviews = catchAsync(async (req, res) => {
  const id = req.params.courseId;
  const result = await CourseServices.getCourseReviews(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});
const getBestCourseOnRatings = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseOnRatings();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.courseId;
  const payload = req.body;

  const result = await CourseServices.updateOneCourse(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getOneCourseReviews,
  getBestCourseOnRatings,
  updateCourse,
};
