import { z } from "zod";
import { isValidPhone } from "@/lib/helpers";
import { RELATIONSHIP } from "@/data/mockData";

export const emergencyContact = z
  .object({
    contactName: z.string().min(1, { message: "Contact Name is required" }),

    relationship: z.enum(RELATIONSHIP, {
      message: "Relationship is required",
    }),

    contactPhone: z
      .string()
      .min(1, { message: "Phone is required" })
      .refine((val) => isValidPhone(val), {
        message: "Invalid phone number. Format: +1-123-456-7890",
      }),

    guardianName: z.string().optional(),
    guardianPhone: z
      .string()
      .optional()
      .refine((val) => !val || isValidPhone(val), {
        message: "Invalid phone number. Format: +1-123-456-7890",
      }),
  })
  .superRefine((data, ctx) => {
    // Guardian fields required if age < 21
    const formDob = (ctx as any).parent?.dob;
    if (!formDob) return;

    const birthDate = new Date(formDob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 21) {
      if (!data.guardianName) {
        ctx.addIssue({
          path: ["guardianName"],
          message: "Guardian Name is required if age < 21",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.guardianPhone) {
        ctx.addIssue({
          path: ["guardianPhone"],
          message: "Guardian Phone is required if age < 21",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type EmergencyContactType = z.infer<typeof emergencyContact>;
