import { LayoutGrid, List, ExternalLink } from 'lucide-react';
import { ViewMode, Candidate } from '@/types';
import KanbanBoard from '@/components/candidates/KanbanBoard';
import CandidateTable from '@/components/candidates/CandidateTable';
import CandidateFilters from '@/components/candidates/CandidateFilters';
import CandidateDetails from '@/components/candidates/CandidateDetails';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export const CandidatesPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [processes, setProcesses] = useState([])
  const [phases, setPhases] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    processId: '',
    recruiter: ''
  });
  const [candidates, setCandidates] = useState([])
  const activeCandidates = candidates.filter(c => c.status === 'active');

  useEffect(() => {
    fetchProcesses();
    fetchPhases();
  }, []);

  useEffect(() => {
    if(filters.processId){
      fetchCandidates(filters.processId);
    }
  }, [filters]);

  const fetchCandidates = async (processId: string) => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')

        if(error) throw error
        
        setCandidates(data)
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch candidates",
        variant: "destructive"
      });
    }
  };

  const fetchPhases = async () => {
    try {
      const { data, error } = await supabase
        .from('phases')
        .select('*')

      if (error) throw error;
      setPhases(data);
    } catch (error) {
      console.error('Error fetching phases:', error);
      toast({
        title: "Error",
        description: "Failed to fetch phases",
        variant: "destructive"
      });
    }
  };
  const fetchProcesses = async () => {
    try {
      const { data, error } = await supabase
        .from('processes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProcesses(data || []);
    } catch (error) {
      console.error('Error fetching processes:', error);
      toast({
        title: "Error",
        description: 'Error al cargar los procesos',
        variant: "destructive"
      });
    }
  };
  // Get unique recruiters for filter
  const recruiters = Array.from(new Set(
    candidates
      .filter(c => c.recruiter)
      .map(c => c.recruiter!)
  ));

  // Apply filters
  const filteredCandidates = activeCandidates.filter(candidate => {
    const matchesSearch = !filters.search ||
      candidate.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesProcess = !filters.processId ||
      candidate.processId === filters.processId;
    const matchesRecruiter = !filters.recruiter ||
      candidate.recruiter === filters.recruiter;

    return matchesSearch && matchesProcess && matchesRecruiter;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tablero de Candidatos</h2>
              <p className="text-gray-600 mt-1">
                {filteredCandidates.length} de {activeCandidates.length} candidatos activos
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/apply"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Formulario Público
              </Link>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'kanban'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  Kanban
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <List className="h-4 w-4 mr-1" />
                  Lista
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'table' && (
            <CandidateFilters
              processes={processes}
              filters={filters}
              onFiltersChange={setFilters}
              recruiters={recruiters}
            />
          )}

          {viewMode === 'kanban' ? (
            <KanbanBoard
              phases={phases}
              candidates={filteredCandidates}
              notifications={[]}
              onCandidatesChange={console.log}
              onCandidateClick={setSelectedCandidate}
            />
          ) : (
            <CandidateTable
              candidates={filteredCandidates}
              phases={phases}
              onCandidateClick={setSelectedCandidate}
            />
          )}

          {selectedCandidate && (
            <CandidateDetails
              candidate={selectedCandidate}
              onClose={() => setSelectedCandidate(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};