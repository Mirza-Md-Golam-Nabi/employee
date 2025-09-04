import { z } from "zod";
import { isWeekend } from "@/lib/helpers";
import { DEPARTMENTS, JOB_TYPES } from "@/data/mockData";

export const jobDetails = z
  .object({
    department: z.enum(DEPARTMENTS, {
      message: "Department is required",
    }),

    jobTitle: z
      .string()
      .min(3, { message: "Position Title must be at least 3 characters" }),

    startDate: z.string().refine((val) => {
      if (!val) return false;
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxFuture = new Date();
      maxFuture.setDate(today.getDate() + 90);
      return date >= today && date <= maxFuture;
    }, "Start date must be within the next 90 days and not in the past"),

    jobType: z.enum(JOB_TYPES, {
      message: "Job type is required",
    }),

    salary: z.number({
      message: "Salary must be a number",
    }),

    manager: z.string().min(1, { message: "Manager is required" }),
  })
  .refine(
    (data) => {
      // HR/Finance start date cannot be on weekend
      if (data.department === "HR" || data.department === "Finance") {
        const date = new Date(data.startDate);
        if (isWeekend(date)) {
          return false;
        }
      }
      return true;
    },
    {
      message: "HR/Finance start date cannot be on weekend",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      // Salary validation based on job type
      if (
        data.jobType === "Full-time" &&
        (data.salary < 30000 || data.salary > 200000)
      ) {
        return false;
      }
      if (
        data.jobType === "Contract" &&
        (data.salary < 50 || data.salary > 150)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Invalid salary for selected job type",
      path: ["salary"],
    }
  );

export type JobDetailsType = z.infer<typeof jobDetails>;
