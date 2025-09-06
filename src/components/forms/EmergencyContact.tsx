// src/components/formSteps/EmergencyContact.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { EmergencyContactType } from "@/lib/validation/emergencyContact";
import { RELATIONSHIP } from "@/data/mockData";

type EmergencyContactProps = {
  age: number;
  onFocus: (fieldName: string) => void;
  onBlur: (fieldName: string) => void;
};

export default function EmergencyContact({ age, onFocus, onBlur }: EmergencyContactProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<EmergencyContactType>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Step 4 — Emergency Contact
      </h2>

      {/* Contact Name */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          Contact Name
        </label>
        <input
          {...register("contactName")}
          onFocus={() => onFocus("contactName")}
          onBlur={() => onBlur("contactName")}
          className="mt-1 w-full border rounded-md p-2"
          placeholder="John Doe"
        />
        {errors.contactName && (
          <p className="text-red-500 text-sm">
            {String(errors.contactName.message)}
          </p>
        )}
      </div>

      {/* Relationship */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          Relationship
        </label>
        <select
          {...register("relationship")}
          onFocus={() => onFocus("relationship")}
          onBlur={() => onBlur("relationship")}
          className="mt-1 w-full border rounded-md p-2"
        >
          <option value="">Select Relationship</option>
          {RELATIONSHIP.map((relation) => (
            <option key={relation} value={relation}>
              {relation}
            </option>
          ))}
        </select>
        {errors.relationship && (
          <p className="text-red-500 text-sm">
            {String(errors.relationship.message)}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          Phone Number
        </label>
        <input
          {...register("contactPhone")}
          onFocus={() => onFocus("contactPhone")}
          onBlur={() => onBlur("contactPhone")}
          className="mt-1 w-full border rounded-md p-2"
          placeholder="+1-123-456-7890"
        />
        {errors.contactPhone && (
          <p className="text-red-500 text-sm">
            {String(errors.contactPhone.message)}
          </p>
        )}
      </div>

      {/* Guardian Contact (if age < 21) */}
      {age < 21 && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Guardian Name
            </label>
            <input
              {...register("guardianName")}
              onFocus={() => onFocus("guardianName")}
              onBlur={() => onBlur("guardianName")}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Parent/Guardian Name"
            />
            {errors.guardianName && (
              <p className="text-red-500 text-sm">
                {String(errors.guardianName.message)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">
              Guardian Phone
            </label>
            <input
              {...register("guardianPhone")}
              onFocus={() => onFocus("guardianPhone")}
              onBlur={() => onBlur("guardianPhone")}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="+1-123-456-7890"
            />
            {errors.guardianPhone && (
              <p className="text-red-500 text-sm">
                {String(errors.guardianPhone.message)}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
