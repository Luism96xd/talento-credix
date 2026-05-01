
import { InterviewScriptForm } from '@/components/tools/InterviewScriptForm';

export const InterviewScripts = () => {
  return (
    <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Generador de guiones de entrevista</h1>
          <InterviewScriptForm />
        </div>
      </div>
    </div>
  );
};