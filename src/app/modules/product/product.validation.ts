import { z } from "zod";

const productValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        modelNo: z.string(),
        opratingSystem: z.string().optional(),
        connectivity: z.string().optional(),
        powerSource: z.string().optional(),
        compatibility: z.string().optional(),
        modelYear: z.string().optional(),
        price: z.number(),
        quantity: z.number(),
        weight: z.number().optional(),
        dimensions: z.number().optional(),
        brandName: z.string().optional(),
        releaseDate: z.string().optional(),
    }),
});

export const productValidations = {
    productValidationSchema,

};