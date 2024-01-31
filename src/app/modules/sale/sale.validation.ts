import { z } from "zod";

const saleValidationSchema = z.object({
    body: z.object({
        customer: z.string(),
        saleDate: z.date(),
        quantity: z.number(),
        product: z.string(),
    }),
});

export const saleValidations = {
    saleValidationSchema,

};