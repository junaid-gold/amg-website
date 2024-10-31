import { z } from "zod";

export const baseAddressFormSchema = z.object({
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
})

export const requiredNameAddressFormSchema = baseAddressFormSchema.superRefine((data, ctx) => {
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

export const optionalNameAddressFormSchema = baseAddressFormSchema.extend({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
}).superRefine((data, ctx) => {
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

export type RequiredNameAddressFormSchemaType = z.infer<typeof requiredNameAddressFormSchema>