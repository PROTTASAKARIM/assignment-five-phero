import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/errors';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessage = err.message;
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error',
    errorSources,
    errorMessage,
  };
};

export default handleCastError;
