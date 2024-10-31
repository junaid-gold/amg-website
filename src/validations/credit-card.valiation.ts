import { z } from "zod";

export const baseCreditCardFormSchema = z.object({
    firstname: z.string().min(1, "Required"),
    lastname: z.string().min(1, "Required"),
    city: z.string().min(1, "Required"),
    country_id: z.string().min(2, "Required"),
    company: z.string().optional(),
    telephone: z.string().min(1, "Required"),
    postcode: z.string().min(1, "Required"),
    street: z.tuple([
        z.string().min(1, "Required"),
        z.string().optional()
    ]),
    region: z.object({
        region_id: z.string().optional(),
        region: z.string().optional(),
    }),
    default_shipping: z.boolean().optional(),
    default_billing: z.boolean().optional(),
    creditCardNumber: z.string().min(13, "Credit card number must be at least 13 digits.")
        .max(19, "Credit card number must be at most 19 digits.")
    // .regex(/^\d+$/, "Credit card number must only contain digits."),
    ,
    creditCardCvc: z.string().min(3, "CVC must be at least 3 digits.")
        .max(4, "CVC must be at most 4 digits.")
        .regex(/^\d+$/, "CVC must only contain digits."),
    creditCardExpiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "Invalid expiry month. Must be between 01 and 12."),
    creditCardExpiryYear: z.string().regex(/^\d{4}$/, "Invalid expiry year. Must be a 4-digit number.")
        .refine((year) => parseInt(year) >= new Date().getFullYear(), {
            message: `Expiry year must be greater than or equal to ${new Date().getFullYear()}`,
        })
})

export const creditCardFormSchema = baseCreditCardFormSchema.superRefine((data, ctx) => {
    if (!data?.region) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["region", "region"]
        });

        return;
    }
    if (!data?.region?.region_id) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["region", "region_id"]
        });
        return
    }
})


export type CreditCardFormSchemaType = z.infer<typeof creditCardFormSchema>