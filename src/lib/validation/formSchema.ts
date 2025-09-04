
import { z } from "zod";
import { personalInfo } from "./personalInfo";
import { jobDetails } from "./jobDetails";

export const formSchema = personalInfo.merge(jobDetails);

export type FormSchemaType = z.infer<typeof formSchema>;
