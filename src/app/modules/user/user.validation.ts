import { z } from 'zod';

const previousPasswordSchema = z.object({
  password: z.string().optional(),
  changeTime: z.string().optional(),
});

const userValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((value) => /\d/.test(value), {
        message: 'Password must contain at least one digit',
      })
      .refine((value) => /[!@#$%^&*()_+{}\\[\]:;<>,.?~\\/\\-]/.test(value), {
        message: 'Password must contain at least one special character',
      }),
    role: z.string().optional(),
    previousPassword: z.array(previousPasswordSchema).optional(),
  }),
});
export const userValidations = {
  userValidationSchema,
};
