import { z } from "zod";
import { isAtLeast18, isValidPhone } from "@/lib/helpers";

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
    .refine((val) => isValidPhone(val), {
      message: "Invalid phone number. Format: +1-123-456-7890",
    }),
  dob: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .refine((val) => isAtLeast18(val) >= 18, {
      message: "You must be at least 18 years old",
    }),

  profilePicture: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        file?.[0]?.type === "image/jpeg" ||
        file?.[0]?.type === "image/png",
      { message: "Only JPG or PNG files are allowed" }
    )
    .refine((file) => !file || file?.[0]?.size <= 2 * 1024 * 1024, {
      message: "Max file size is 2MB",
    }),
});

export type PersonalInfoType = z.infer<typeof personalInfo>;
