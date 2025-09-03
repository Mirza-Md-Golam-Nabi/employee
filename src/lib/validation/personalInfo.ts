import { z } from "zod";
import { isAtLeast18 } from "@/lib/helpers";

export const personalInfo = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full name is required" })
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Full name must contain at least 2 words",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .refine((val) => /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/.test(val), {
      message: "Invalid phone number. Format: +1-123-456-7890",
    }),
  dob: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .refine((val) => isAtLeast18(val) >= 18, {
      message: "You must be at least 18 years old",
    }),
});

export type PersonalInfoType = z.infer<typeof personalInfo>;
