import { z } from "zod";
import { personalInfo } from "./personalInfo";
import { jobDetails } from "./jobDetails";
import { skillsPreferences } from "./skillsPreferences";
import { emergencyContact } from "./emergencyContact";

export const formSchema = personalInfo
  .merge(jobDetails)
  .merge(skillsPreferences)
  .merge(emergencyContact);

export type FormSchemaType = z.infer<typeof formSchema>;
