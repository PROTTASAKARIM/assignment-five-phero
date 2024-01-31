import { Schema, Types, model } from "mongoose";
import { TSale } from "./sale.interface";

const saleSchema = new Schema<TSale>(
    {
        customer: {
            type: String,
            trim: true,
            required: true,
        },
        saleDate: {
            type: Date,
            trim: true,
            required: true,
        },
        quantity: {
            type: Number,
            trim: true,
            required: true,
            default: 0
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },

    },
    {
        timestamps: true,
    },
);

export const Sale = model<TSale>('Sale', saleSchema);