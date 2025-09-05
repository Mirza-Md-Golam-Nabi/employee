"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalInfo from "./forms/PersonalInfo";
import JobDetails from "./forms/JobDetails";
import { formSchema, FormSchemaType } from "@/lib/validation/formSchema";
import SkillsPreferences from "./forms/SkillsPreferences";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      // fullName: "",
      // email: "",
      // phone: "",
      // dob: "",
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1-123-456-7890",
      dob: "1990-01-01",
    },
    mode: "onTouched",
  });

  const fieldsByStep: Record<number, (keyof FormSchemaType)[]> = {
    1: ["fullName", "email", "phone", "dob"],
    2: ["department", "jobTitle", "startDate", "jobType", "salary", "manager"],
    3: [
      "skills",
      "experiences",
      "workingHours",
      "remotePreference",
      "managerApproved",
      "extraNotes",
    ],
  };

  const handleNext = async () => {
    const isValid = await methods.trigger(fieldsByStep[step], {
      shouldFocus: true,
    });
    if (isValid) setStep((prev) => prev + 1);
  };

  const onSubmit = methods.handleSubmit((data) => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      console.log("Final Submitted Data:", data);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Step 1 */}
        {step === 1 && <PersonalInfo />}

        {/* Step 2 */}
        {step === 2 && <JobDetails />}

        {/* Step 3 */}
        {step === 3 && <SkillsPreferences />}

        {/* Step 4 - Review */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Review Your Info</h2>
            <pre className="bg-gray-100 p-4 rounded mt-2">
              {JSON.stringify(methods.getValues(), null, 2)}
            </pre>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Final Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
