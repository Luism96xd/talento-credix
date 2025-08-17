
import { InterviewScriptForm } from '@/components/InterviewScriptForm';
import UserMenu from '@/components/UserMenu';

export const InterviewScripts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Generador de guiones de entrevista</h1>
            <UserMenu />
          </div>
          <InterviewScriptForm />
        </div>
      </div>
    </div>
  );
};