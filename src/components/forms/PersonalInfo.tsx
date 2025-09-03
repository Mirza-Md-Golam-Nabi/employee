"use client";
import { useFormContext } from "react-hook-form";
import { PersonalInfoType } from "@/lib/validation/personalInfo";

export default function PersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PersonalInfoType>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Step 1 — Personal Info
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-800">
          Full Name
        </label>
        <input
          {...register("fullName")}
          className="mt-1 w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.fullName.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Email</label>
        <input
          {...register("email")}
          type="email"
          className="mt-1 w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.email.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Phone</label>
        <input
          {...register("phone")}
          className="mt-1 w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="+1-123-456-7890"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.phone.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">
          Date of Birth
        </label>
        <input
          {...register("dob")}
          type="date"
          className="mt-1 w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.dob.message)}
          </p>
        )}
      </div>
    </div>
  );
}
