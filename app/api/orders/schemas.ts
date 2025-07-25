import { z } from "zod";

export const OrderSchema = z.object({
    userId: z.number(),
    totalAmount: z.number(),
    items: z.any(),
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    comment: z.string().optional(),
});