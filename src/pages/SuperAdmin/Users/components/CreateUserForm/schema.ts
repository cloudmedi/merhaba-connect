import * as z from "zod";

export const createUserFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  role: z.enum(["admin", "manager"]),
  license: z.object({
    type: z.enum(["trial", "premium"]),
    startDate: z.date({
      required_error: "Please select a start date",
    }),
    endDate: z.date({
      required_error: "Please select an end date",
    }),
    quantity: z.number().min(1, "Must have at least 1 license"),
  }),
});

export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;