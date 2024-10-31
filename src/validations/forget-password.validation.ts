
import { z } from "zod";

export const forgetPasswordFormSchema = z.object({
    email: z.string().min(1, { message: "Required" }),
});

export type ForgetPasswordFormSchemaType = z.infer<typeof forgetPasswordFormSchema>;
