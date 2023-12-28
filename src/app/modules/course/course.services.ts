import { TCourse } from './course.interface';
import { Course } from './course.model';
import { Review } from '../review/review.model';
import mongoose from 'mongoose';
import AppError from '../../errors/Apperror';
import httpStatus from 'http-status';
// import { AggregationStage } from '../../utils/aggreagtionType';
import { JwtPayload } from 'jsonwebtoken';

const createCourseIntoDB = async (userData: JwtPayload,payload: TCourse) => {
  const data={...payload,createdBy:userData._id}
  const result = await Course.create(data);
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllCoursesFromDB = async (query: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;
  // const aggregationPipeline: AggregationStage[] = [
  //   {
  //     $match: {},
  //   },
  //   {
  //     $lookup: {
  //       from: 'users',
  //       localField: 'createdBy',
  //       foreignField: '_id',
  //       as: 'createdBy',
  //     },
  //   },
  //   {
  //     $unwind: '$createdBy'
  //   }
  // ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aggregationPipeline: any = [
    {
      $match: {},
    },
    {
      $lookup: {
        from: 'users',
        let: { createdBy: '$createdBy' }, // Variable to store the value of 'createdBy'
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$createdBy'] }, // Match the '_id' of 'users' with 'createdBy'
            },
          },
          {
            $project: {
              _id: 1, 
              username: 1,
              email: 1,
              role: 1,
          
            },
          },
        ],
        as: 'createdBy',
      },
    },
    {
      $unwind: '$createdBy',
    },
    // Add more stages as needed
  ];
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(query);

  if (startDate) {
    aggregationPipeline.push({ $match: { startDate: { $gte: startDate } } });
  }
  if (endDate) {
    aggregationPipeline.push({ $match: { endDate: { $lte: endDate } } });
  }
  if (minPrice) {
    aggregationPipeline.push({
      $match: { price: { $gte: parseFloat(minPrice) } },
    });
  }
  if (maxPrice) {
    aggregationPipeline.push({
      $match: { price: { $lte: parseFloat(maxPrice) } },
    });
  }
  if (language) {
    aggregationPipeline.push({ $match: { language: language } });
  }
  if (durationInWeeks) {
    aggregationPipeline.push({
      $match: { durationInWeeks: { $eq: parseFloat(durationInWeeks) } },
    });
  }
  if (level) {
    aggregationPipeline.push({ $match: { 'details.level': level } });
  }
  if (provider) {
    aggregationPipeline.push({ $match: { provider: provider } });
  }
  if (tags) {
    aggregationPipeline.push({ $match: { 'tags.name': tags } });
  }
  if (sortBy) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortStage: any = {
      $sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
    };
    aggregationPipeline.push(sortStage);
  }
  const pageNow = parseFloat(page) || 1;
  const limitNow = parseFloat(limit) || 10;
  const skip = (pageNow - 1) * limitNow;
  aggregationPipeline.push({ $skip: skip });
  aggregationPipeline.push({ $limit: limitNow });

  console.log(aggregationPipeline);

  const result = await Course.aggregate(aggregationPipeline);
  const totalData = await Course.countDocuments();

  return {
    result: result,
    meta: { page: pageNow, limit: limitNow, total: totalData },
  };
};
const getCourseReviews = async (_id: string) => {
  const result = await Course.findOne({ _id }).populate('createdBy',{_id:1,username:1,email:1,role:1});
  const reviews = await Review.find({ courseId: _id }).populate('createdBy',{_id:1,username:1,email:1,role:1});

  return { course: result, reviews: reviews };
};
const getBestCourseOnRatings = async () => {
  const result = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: {
          $ifNull: [
            {
              $avg: '$reviews.rating',
            },
            0,
          ],
        },
        reviewCount: {
          $size: '$reviews',
        },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { createdBy: '$createdBy' }, // Variable to store the value of 'createdBy'
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$createdBy'] }, // Match the '_id' of 'users' with 'createdBy'
            },
          },
          {
            $project: {
              _id: 1, 
              username: 1,
              email: 1,
              role: 1,
          
            },
          },
        ],
        as: 'createdBy',
      },
    },
    {
      $unwind: '$createdBy',
    },
    {
      $project: {
        _id: 1,
        title: 1,
        instructor: 1,
        categoryId: 1,
        price: 1,
        tags: 1,
        startDate: 1,
        endDate: 1,
        language: 1,
        provider: 1,
        createdBy:1,
        durationInWeeks: 1,
        details: 1,
        averageRating: 1,
        reviewCount: 1,
      },
    },
  ]);

  return result.length > 0 ? { course: result[0] } : {};
};

const updateOneCourse = async (id: string, payload: Partial<TCourse>) => {
  const { details, tags, ...remainingData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingData,
    };
    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        modifiedUpdatedData[`details.${key}`] = value;
      }
    }
    const updateWithoutTags = await Course.findByIdAndUpdate(
      id,
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateWithoutTags) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
    }

    if (tags && tags.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = tags
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);

      const deletedTags = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedTags) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // filter out the new course fields
      const newTags = tags?.filter((el) => el.name && !el.isDeleted);

      const newTagsUpdated = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: newTags } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newTagsUpdated) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate('createdBy',{_id:1,username:1,email:1,role:1});
    return result;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getCourseReviews,
  getBestCourseOnRatings,
  updateOneCourse,
};
