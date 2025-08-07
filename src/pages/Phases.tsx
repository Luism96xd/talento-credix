import { PhaseManagement } from "@/components/PhaseManagement";

export const Phases = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PhaseManagement />
        </div>
      </div>
    </div>
  );
};