/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../errors/Apperror';
import catchAsync from '../utils/catchAsync';

// eslint-disable-next-line no-unused-vars
const calculateBetweenWeeks = catchAsync(async (req, res, next) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const durationInWeeks = req.body.durationInWeeks;
  const start = new Date(startDate);
  const end = new Date(endDate);

  // console.log(req.body)
  // console.log(startDate,endDate)
  // console.log(start,end)
  if (durationInWeeks) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'durationInWeeks should come from Start and End date',
    );
  }
  if (startDate && endDate) {
    const timeDifference = (end.getTime() - start.getTime()) as number;

    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    const weeks = Math.ceil(timeDifference / oneWeekInMilliseconds);

    req.body.durationInWeeks = weeks;
  }

  // return weeks;
  next();
});

export default calculateBetweenWeeks;
