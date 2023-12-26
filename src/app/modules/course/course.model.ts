import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';

const tagSchema = new Schema<TTags>({
  name: {
    type: String,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    trim: true,
    // enum:["Beginner", "Intermediate", "Advanced"]
  },
  description: {
    type: String,
    trim: true,
  },
});
const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    instructor: {
      type: String,
      trim: true,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: [tagSchema],
    startDate: {
      type: String,
      trim: true,
      required: true,
    },
    endDate: {
      type: String,
      trim: true,
      required: true,
    },
    language: {
      type: String,
      trim: true,
      // required: true,
    },
    provider: {
      type: String,
      trim: true,
      // required: true,
    },
    durationInWeeks: {
      type: Number,
      // required: true,
    },
    details: detailsSchema,
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('Course', courseSchema);
