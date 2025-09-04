"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalInfo from "./forms/PersonalInfo";
import JobDetails from "./forms/JobDetails";
import { formSchema, FormSchemaType } from "@/lib/validation/formSchema";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
    },
    mode: "onTouched",
  });

  const fieldsByStep: Record<number, (keyof FormSchemaType)[]> = {
    1: ["fullName", "email", "phone", "dob"],
    2: ["department", "jobTitle", "startDate", "jobType", "salary", "manager"],
  };

  const handleNext = async () => {
    const isValid = await methods.trigger(fieldsByStep[step], {
      shouldFocus: true,
    });
    if (isValid) setStep((prev) => prev + 1);
  };

  const onSubmit = methods.handleSubmit((data) => {
    console.log("working");
    if (step < 3) {
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

        {/* Step 3 - Review */}
        {step === 3 && (
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
          {step < 3 ? (
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
