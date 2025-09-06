"use client";
import { useFormContext } from "react-hook-form";
import { JobDetailsType } from "@/lib/validation/jobDetails";
import { DEPARTMENTS, JOB_TYPES, mockManagers } from "@/data/mockData";

type JobDetailsProps = {
  onFocus: (fieldName: string) => void;
  onBlur: (fieldName: string) => void;
};

export default function JobDetails({ onFocus, onBlur }: JobDetailsProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<JobDetailsType>();

  const department = watch("department");
  const jobType = watch("jobType");

  const filteredManagers = mockManagers.filter(
    (m) => m.department === department
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Step 2 — Job Details
      </h2>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          Department
        </label>
        <select
          {...register("department")}
          onFocus={() => onFocus("department")}
          onBlur={() => onBlur("department")}
          className="mt-1 w-full border rounded-md p-2"
        >
          <option value="">Select Department</option>
          {DEPARTMENTS.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className="text-red-500 text-sm">
            {String(errors.department.message)}
          </p>
        )}
      </div>

      {/* Job Title */}
      <div>
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-gray-800"
        >
          Position Title
        </label>
        <input
          id="jobTitle"
          {...register("jobTitle")}
          onFocus={() => onFocus("jobTitle")}
          onBlur={() => onBlur("jobTitle")}
          className="mt-1 w-full border rounded-md p-2"
          placeholder="Software Engineer"
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm">
            {String(errors.jobTitle.message)}
          </p>
        )}
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          Start Date
        </label>
        <input
          type="date"
          {...register("startDate")}
          onFocus={() => onFocus("startDate")}
          onBlur={() => onBlur("startDate")}
          className="mt-1 w-full border rounded-md p-2"
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">
            {String(errors.startDate.message)}
          </p>
        )}
      </div>

      {/* Job Type */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          Job Type
        </label>
        <div className="flex gap-4 mt-1">
          {JOB_TYPES.map((type) => (
            <label key={type}>
              <input
                type="radio"
                value={type}
                {...register("jobType")}
                onFocus={() => onFocus("jobType")}
                onBlur={() => onBlur("jobType")}
              />{" "}
              {type}
            </label>
          ))}
        </div>
        {errors.jobType && (
          <p className="text-red-500 text-sm">{errors.jobType.message}</p>
        )}
      </div>

      {/* Salary */}
      {(jobType === "Full-time" || jobType === "Contract") && (
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {jobType === "Full-time" ? "Annual Salary ($)" : "Hourly Rate ($)"}
          </label>
          <input
            type="number"
            {...register("salary", { valueAsNumber: true })}
            onFocus={() => onFocus("salary")}
            onBlur={() => onBlur("salary")}
            className="mt-1 w-full border rounded-md p-2"
            placeholder={jobType === "Full-time" ? "50000" : "100"}
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">
              {String(errors.salary.message)}
            </p>
          )}
        </div>
      )}

      {/* Manager */}
      {department && (
        <div>
          <label className="block text-sm font-medium text-gray-800">
            Manager
          </label>
          <select
            {...register("manager")}
            onFocus={() => onFocus("manager")}
            onBlur={() => onBlur("manager")}
            className="mt-1 w-full border rounded-md p-2"
          >
            <option value="">Select Manager</option>
            {filteredManagers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          {errors.manager && (
            <p className="text-red-500 text-sm">
              {String(errors.manager.message)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
