import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/errors';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  let errorMessage = '';
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      errorMessage = errorMessage + '' + val.message + '. ';
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
    errorMessage,
  };
};

export default handleValidationError;
