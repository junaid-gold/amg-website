
import { z } from "zod";

export const signInFormSchema = z.object({
    username: z.string().min(1, { message: "Required" }),
    password: z.string().min(1, { message: "Required" }),
});

export type SignInFormSchemaType = z.infer<typeof signInFormSchema>;
