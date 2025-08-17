
import { CandidateAnalysisForm } from '@/components/candidates/CandidateAnalysis';
import UserMenu from '@/components/UserMenu';

const CVAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Comparador de candidatos</h1>
            <UserMenu />
          </div>
          <CandidateAnalysisForm />
        </div>
      </div>
    </div>
  );
};
export default CVAnalysisPage