import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/errors';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  let errorMessage = '';
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    errorMessage = errorMessage + issue.message + '. ';
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
    errorMessage,
  };
};

export default handleZodError;
