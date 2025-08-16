import ProcessManagement  from "@/components/processes/ProcessManagement";

export const Processes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProcessManagement/>
        </div>
      </div>
    </div>
  );
};