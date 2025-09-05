import { z } from "zod";

export const skillsPreferences = z
  .object({
    department: z.string().min(1),
    skills: z.array(z.string()).min(3, "Select at least 3 skills"),
    experiences: z.record(z.string(), z.string().min(1, "Experience required")),
    workingHours: z.object({
      start: z.string().min(1, "Start time required"),
      end: z.string().min(1, "End time required"),
    }),
    remotePreference: z.number().min(0).max(100),
    managerApproved: z.boolean().optional(),
    extraNotes: z.string().max(500, "Max 500 characters").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.workingHours.start && data.workingHours.end) {
      const start = new Date(`1970-01-01T${data.workingHours.start}:00`);
      const end = new Date(`1970-01-01T${data.workingHours.end}:00`);
      if (end <= start) {
        ctx.addIssue({
          code: "custom",
          path: ["workingHours", "end"],
          message: "End time must be after start time",
        });
      }
    }

    if (data.remotePreference > 50 && !data.managerApproved) {
      ctx.addIssue({
        code: "custom",
        path: ["managerApproved"],
        message: "Manager approval required for remote preference > 50%",
      });
    }
  });

export type SkillsPreferencesType = z.infer<typeof skillsPreferences>;
