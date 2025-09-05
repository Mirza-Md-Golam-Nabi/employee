"use client";

import { useFormContext } from "react-hook-form";
import { FormSchemaType } from "@/lib/validation/formSchema";
import { mockManagers } from "@/data/mockData";

type ReviewSubmitProps = {
  confirmed: boolean;
  setConfirmed: (val: boolean) => void;
};

export default function ReviewSubmit({
  confirmed,
  setConfirmed,
}: ReviewSubmitProps) {
  const { getValues } = useFormContext<FormSchemaType>();
  const data = getValues();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Step 5 — Review & Submit
      </h2>
      <p className="text-gray-600">
        Please review all the details below before submitting your information.
      </p>

      {/* Review Info */}
      <div className="border rounded-lg p-4 space-y-4 bg-white shadow">
        <Section title="Personal Info">
          <Field label="Full Name" value={data.fullName} />
          <Field label="Email" value={data.email} />
          <Field label="Phone" value={data.phone} />
          <Field label="Date of Birth" value={data.dob} />
        </Section>

        <Section title="Job Details">
          <Field label="Department" value={data.department} />
          <Field label="Position" value={data.jobTitle} />
          <Field label="Start Date" value={data.startDate} />
          <Field label="Job Type" value={data.jobType} />
          <Field label="Salary" value={String(data.salary)} />
          <Field
            label="Manager"
            value={mockManagers.find((m) => m.id === data.manager)?.name}
          />
        </Section>

        <Section title="Skills & Preferences">
          <Field
            label="Skills & Experience"
            value={data.skills
              ?.map(
                (skill) => `${skill} (${data.experiences?.[skill] || 0} yrs)`
              )
              .join(", ")}
          />

          <Field
            label="Working Hours"
            value={`${data.workingHours?.start || ""} - ${
              data.workingHours?.end || ""
            }`}
          />
          <Field
            label="Remote Preference"
            value={`${data.remotePreference}%`}
          />
          {data.managerApproved && (
            <Field label="Manager Approved" value="Yes" />
          )}
          <Field label="Notes" value={data.extraNotes} />
        </Section>

        <Section title="Emergency Contact">
          <Field label="Name" value={data.contactName} />
          <Field label="Relationship" value={data.relationship} />
          <Field label="Phone" value={data.contactPhone} />
          {data.guardianName && (
            <>
              <Field label="Guardian Name" value={data.guardianName} />
              <Field label="Guardian Phone" value={data.guardianPhone} />
            </>
          )}
        </Section>
      </div>

      {/* Confirm Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="confirm"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="w-4 h-4"
        />
        <label
          htmlFor="confirm"
          className="text-sm font-medium text-gray-800 cursor-pointer"
        >
          I confirm all information is correct
        </label>
      </div>
      {!confirmed && (
        <p className="text-sm text-red-500">
          You must confirm before submitting.
        </p>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 border-b pb-1">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div>
      <span className="block text-sm font-medium text-gray-600">{label}</span>
      <span className="block text-gray-900">{value || "—"}</span>
    </div>
  );
}
