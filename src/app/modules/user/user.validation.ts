import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
  username: z.string(),
  password: z.string(),
})});
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
const newPasswordValidation = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, {
        message: 'Your NewPassword must be at least 8 characters long',
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Your NewPassword must contain at least one uppercase letter',
      })
      .refine((value) => /\d/.test(value), {
        message: 'Password must contain at least one digit',
      })
      .refine((value) => /[!@#$%^&*()_+{}\\[\]:;<>,.?~\\/\\-]/.test(value), {
        message: 'Your NewPassword must contain at least one special character',
      }),
  }),
});

export const userValidations = {
  userValidationSchema,
  loginValidationSchema,
  newPasswordValidation,
};
