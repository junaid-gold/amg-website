import { z } from 'zod';

export const changePasswordFormSchema = z.object({
    currentPassword: z.string().min(1, "Required"),
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
    path: ["confirmPassword"],
});

export type ChangePasswordFormSchemaType = z.infer<typeof changePasswordFormSchema>;
