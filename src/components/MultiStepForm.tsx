"use client";

import React, { useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalInfo from "./forms/PersonalInfo";
import JobDetails from "./forms/JobDetails";
import { formSchema, FormSchemaType } from "@/lib/validation/formSchema";
import SkillsPreferences from "./forms/SkillsPreferences";
import EmergencyContact from "./forms/EmergencyContact";
import { calculateAge } from "@/lib/helpers";
import ReviewSubmit from "./forms/Review";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const fieldTimers = useRef<{ [key: string]: number }>({});
  const fieldStartTimes = useRef<{ [key: string]: number | null }>({});

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
      dob: "2004-01-01",
    },
    mode: "onTouched",
  });

  const dob = methods.watch("dob");
  const age = calculateAge(dob);

  const fieldsByStep: Record<number, (keyof FormSchemaType)[]> = {
    1: ["fullName", "email", "phone", "dob", "profilePicture"],
    2: ["department", "jobTitle", "startDate", "jobType", "salary", "manager"],
    3: [
      "skills",
      "experiences",
      "workingHours",
      "remotePreference",
      "managerApproved",
      "extraNotes",
    ],
    4: [
      "contactName",
      "relationship",
      "contactPhone",
      "guardianName",
      "guardianPhone",
    ],
  };

  const handleNext = async () => {
    const currentStep = step;
    const isValid = await methods.trigger(fieldsByStep[currentStep], {
      shouldFocus: true,
    });
    if (isValid) setStep((prev) => prev + 1);
  };

  const handleFocus = (fieldName: string) => {
    fieldStartTimes.current[fieldName] = Date.now();
  };

  const handleBlur = (fieldName: string) => {
    const start = fieldStartTimes.current[fieldName];
    if (start) {
      const duration = Date.now() - start;
      fieldTimers.current[fieldName] =
        (fieldTimers.current[fieldName] || 0) + duration;
      fieldStartTimes.current[fieldName] = null;
    }
  };

  const onSubmit = methods.handleSubmit((data) => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else {
      alert(
        "Submission successful! Open the console to view the submitted data."
      );
      console.log("Final Submitted Data:", data);
      console.log("Field Analytics:", fieldTimers.current);
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleNext();
          }
        }}
        className="max-w-2xl mx-auto p-6 space-y-6"
      >
        {step === 1 && (
          <PersonalInfo onFocus={handleFocus} onBlur={handleBlur} />
        )}
        {step === 2 && <JobDetails onFocus={handleFocus} onBlur={handleBlur} />}
        {step === 3 && (
          <SkillsPreferences onFocus={handleFocus} onBlur={handleBlur} />
        )}
        {step === 4 && (
          <EmergencyContact
            age={age}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
        {step == 5 && (
          <ReviewSubmit confirmed={confirmed} setConfirmed={setConfirmed} />
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
          ) : step == 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Review
            </button>
          ) : (
            <button
              type="submit"
              disabled={!confirmed}
              className={`px-4 py-2 rounded text-white ${
                confirmed
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
