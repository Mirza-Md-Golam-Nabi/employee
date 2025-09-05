import MultiStepForm from "@/components/MultiStepForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-white p-8 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          Employee Onboarding — Test
        </h1>
        <MultiStepForm />
      </div>
    </main>
  );
}
