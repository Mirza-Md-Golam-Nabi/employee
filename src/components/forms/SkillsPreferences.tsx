"use client";
import { useFormContext } from "react-hook-form";
import { skillsByDepartment } from "@/data/mockData";
import { FormSchemaType } from "@/lib/validation/formSchema";

type SkillsPreferencesProps = {
  onFocus: (fieldName: string) => void;
  onBlur: (fieldName: string) => void;
};

export default function SkillsPreferences({onFocus, onBlur}: SkillsPreferencesProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormSchemaType>();

  const department = watch("department");
  const skillsList =
    skillsByDepartment[department as keyof typeof skillsByDepartment] || [];
  const selectedSkills: string[] = watch("skills") || [];
  const remotePreference = watch("remotePreference") || 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Step 3 — Skills & Preferences
      </h2>
      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Primary Skills (Select at least 3)
        </label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {skillsList.map((skill) => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={skill}
                {...register("skills")}
                onFocus={() => onFocus("skills")}
                onBlur={() => onBlur("skills")}
                className="rounded border-gray-300"
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>
        {errors.skills && (
          <p className="text-red-500 text-sm">
            {String(errors.skills.message)}
          </p>
        )}
      </div>

      {/* Experience for each selected skill */}
      {selectedSkills.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience per Skill
          </label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {selectedSkills.map((skill) => (
              <div key={skill}>
                <label className="text-sm text-gray-600">{skill}</label>
                <input
                  type="text"
                  placeholder="e.g. 2 years"
                  {...register(`experiences.${skill}`)}
                  onFocus={() => onFocus(`experiences.${skill}`)}
                  onBlur={() => onBlur(`experiences.${skill}`)}
                  className="mt-1 w-full border rounded-md p-2"
                />
                {(errors as any).experiences?.[skill] && (
                  <p className="text-red-500 text-sm">
                    {String((errors as any).experiences?.[skill]?.message)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Working Hours */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Preferred Working Hours
        </label>
        <div className="flex gap-2 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              {...register("workingHours.start")}
              onFocus={() => onFocus("workingHours.start")}
              onBlur={() => onBlur("workingHours.start")}
              className={`w-full border rounded-md p-2 ${
                errors.workingHours?.start
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.workingHours?.start && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.workingHours.start.message)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              {...register("workingHours.end")}
              onFocus={() => onFocus("workingHours.end")}
              onBlur={() => onBlur("workingHours.end")}
              className={`w-full border rounded-md p-2 ${
                errors.workingHours?.end ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.workingHours?.end && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.workingHours.end.message)}
              </p>
            )}
          </div>
        </div>
        {/* Combined message removed in favor of field-specific messages above */}
      </div>

      {/* Remote Work Preference */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Remote Work Preference ({remotePreference}%)
        </label>
        <input
          type="range"
          min={0}
          max={100}
          step={10}
          {...register("remotePreference", { valueAsNumber: true })}
          onFocus={() => onFocus("remotePreference")}
          onBlur={() => onBlur("remotePreference")}
          className="w-full mt-2"
        />
      </div>

      {/* Manager Approved (only if > 50%) */}
      {remotePreference > 50 && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("managerApproved")}
            onFocus={() => onFocus("managerApproved")}
            onBlur={() => onBlur("managerApproved")}
          />
          <span>Manager Approved</span>
          {errors.managerApproved && (
            <p className="text-red-500 text-sm">
              {String(errors.managerApproved.message)}
            </p>
          )}
        </div>
      )}

      {/* Extra Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Extra Notes (optional)
        </label>
        <textarea
          {...register("extraNotes")}
          onFocus={() => onFocus("extraNotes")}
          onBlur={() => onBlur("extraNotes")}
          placeholder="Any extra notes (max 500 chars)"
          className="mt-1 w-full border rounded-md p-2"
        />
        {errors.extraNotes && (
          <p className="text-red-500 text-sm">
            {String(errors.extraNotes.message)}
          </p>
        )}
      </div>
    </div>
  );
}
