import mongoose from "mongoose";
import { TSale } from "./sale.interface";
import { Sale } from "./sale.model";
import { Product } from "../product/product.model";

const createSaleIntoDB = async (payload: Partial<TSale>) => {
    const session = await mongoose.startSession();
    try {
        const sale = await session.withTransaction(async () => {
            const result = await Sale.create(payload);
            return result;
        });
        const product = await Product.findById(payload.product)
        const quantity =

    } catch (err) {

    }
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

        const result = await Course.findById(id).populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 });
        return result;
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }
};

export const SaleServices = {
    createSaleIntoDB
};