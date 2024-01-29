import { Schema, Types, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        modelNo: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        opratingSystem: {
            type: String,
            trim: true,
        },
        connectivity: {
            type: String,
            trim: true,
        },
        powerSource: {
            type: String,
            trim: true,
        },
        compatibility: {
            type: String,
            trim: true,
        },
        modelYear: {
            type: Date,
            trim: true,
        },
        price: {
            type: Number,
            trim: true,
        },
        quantity: {
            type: Number,
            trim: true,
        },
        weight: {
            type: Number,
            trim: true,
        },
        dimensions: {
            type: Number,
            trim: true,
        },
        brandName: {
            type: String,
            trim: true,
        },
        releaseDate: {
            type: Date,
            trim: true,
        },

    },
    {
        timestamps: true,
    },
);

export const Product = model<TProduct>('Product', productSchema);