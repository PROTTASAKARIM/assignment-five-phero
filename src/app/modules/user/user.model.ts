import { Schema, model } from 'mongoose';
import { TPreviousPassword, TUser } from './user.interface';

const previousPasswordSchema = new Schema<TPreviousPassword>({
  password: {
    type: String,
    trim: true,
  },
  changeTime: {
    type: Date,
  },
});

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    previousPassword: {
      type: [previousPasswordSchema],
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
      select: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
