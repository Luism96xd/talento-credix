
import { CandidateAnalysisForm } from '@/components/candidates/CandidateAnalysis';

const CVAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Análisis de candidatos</h1>
          <CandidateAnalysisForm />
        </div>
      </div>
    </div>
  );
};

export default CVAnalysisPage;
