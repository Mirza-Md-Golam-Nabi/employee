
"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalInfo from "./forms/PersonalInfo";
import { personalInfo, PersonalInfoType } from "@/lib/validation/personalInfo";

export default function MultiStepForm() {
  const [formData, setFormData] = useState<PersonalInfoType | null>(null);

  const methods = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfo),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
    },
    mode: "onTouched",
  });

  const onSubmit = methods.handleSubmit((data) => {
    setFormData(data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto p-6">
        <PersonalInfo />
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
