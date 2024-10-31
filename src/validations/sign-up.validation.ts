// schemas/customerSchema.ts

import { z } from 'zod';
import { optionalNameAddressFormSchema } from './address.validation';

const CustomAttributeSchema = z.object({
    attribute_code: z.string().min(1, "Attribute code is required").default("referral"),
    value: z.string().min(1, "Required"),
});

const ExtensionAttributesSchema = z.object({
    is_subscribed: z.boolean().optional(),
});

export const signUpFormSchema = z.object({
    customer: z.object({
        email: z.string().email("Invalid email address"),
        firstname: z.string().min(1, "Required"),
        lastname: z.string().min(1, "Required"),
        addresses: z.array(optionalNameAddressFormSchema).min(1, "At least one address is required"),
        extension_attributes: ExtensionAttributesSchema.optional(),
        custom_attributes: z.array(CustomAttributeSchema),
    }),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(6, "Required"),

}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This ensures the error is associated with confirmPassword
});

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;