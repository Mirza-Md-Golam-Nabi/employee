
import { z } from "zod";
import { personalInfo } from "./personalInfo";
import { jobDetails } from "./jobDetails";
import { skillsPreferences } from "./skillsPreferences";

export const formSchema = personalInfo.merge(jobDetails).merge(skillsPreferences);

export type FormSchemaType = z.infer<typeof formSchema>;
