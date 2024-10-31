import { z } from 'zod';

export const changeCustomerDataFormSchema = z.object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Invalid Email Address").optional(),
})

export type ChangeCustomerDataFormSchemaType = z.infer<typeof changeCustomerDataFormSchema>;
