import { LayoutGrid, List, ExternalLink, ArrowLeft, Users } from 'lucide-react';
import { ViewMode, Candidate, Requisition, InvitationData } from '@/types';
import KanbanBoard from '@/components/candidates/KanbanBoard';
import CandidateTable from '@/components/candidates/CandidateTable';
import CandidateFilters from '@/components/candidates/CandidateFilters';
import CandidateDetails from '@/components/candidates/CandidateDetails';
import { useEffect, useState } from 'react';
import {  useToast } from '@/hooks/use-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { calculateDaysOpen } from '@/lib/utils';
import InvitationModal from '@/components/candidates/InvitationModal';
import { useKanbanState } from '@/hooks/useKanbanState';
import { useAuth } from '@/contexts/AuthContext';

export const KanbanPage = () => {
  const { toast } = useToast()
  const { profile } = useAuth()
  const { processId } = useParams();
  const navigate = useNavigate()
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [requisition, setRequisition] = useState<Requisition | null>(null)
  const [filters, setFilters] = useState({
    search: '',
    processId: '',
    recruiter: ''
  });
  const { phases, candidates, processes, notifications, addCandidates, fetchCandidates, sendInvitations, moveCandidateToPhase } = useKanbanState()
  const activeCandidates = candidates.filter(c => c.status === 'active');

  useEffect(() => {
    fetchCandidates(processId)
  }, []);

  // Get unique recruiters for filter
  const recruiters = Array.from(new Set(
    candidates
      .filter(c => c.recruiter)
      .map(c => c.recruiter!)
  ));

  const handleSendInvitations = async (invitations: InvitationData[]) => {
    try {
      const newCandidates = invitations.map(item => ({ 
        ...item, 
        requisition_id: processId, 
        recruiter_id: profile.id,
        status: 'active', 
        current_phase_id: phases[0].id 
      }))
      await addCandidates(newCandidates)
      await sendInvitations(invitations, processId)
      fetchCandidates(processId)
      toast({
        title: "Éxito",
        description: "Invitaciones enviadas con éxito",
      });
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Error al enviar las invitaciones",
      })
    }
  }

  // Apply filters
  const filteredCandidates = activeCandidates.filter(candidate => {
    const matchesSearch = !filters.search ||
      candidate.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesProcess = !filters.processId ||
      candidate.requisition_id === filters.processId;
    const matchesRecruiter = !filters.recruiter ||
      candidate.recruiter === filters.recruiter;

    return matchesSearch && matchesProcess && matchesRecruiter;
  });

  const handleCandidateChange = async (candidate: Candidate) => {
    await fetchCandidates(candidate.requisition_id)
    setSelectedCandidate(null);
  };

  if (phases.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
        <div className="text-center">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay fases configuradas</h3>
          <p className="text-gray-600">Configure las fases del proceso antes de ver el tablero</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-4">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/vacantes')}
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2 mt-1" />
                Volver a Vacantes
              </Button>
              <h2 className="text-2xl font-bold text-gray-900">{requisition?.positions?.name ?? 'Tablero de Candidatos'}</h2>
              <p className="text-gray-600 mt-1">
                {filteredCandidates.length} de {activeCandidates.length} candidatos activos
              </p>
              <p className="text-gray-600 mt-1">
                Vacante abierta durante {requisition?.status === 'open' ? calculateDaysOpen(requisition?.created_at) : requisition?.days_open} días

              </p>
            </div>

            <div className="flex items-center space-x-4">
              <InvitationModal onSendInvitations={handleSendInvitations}/>
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
              candidates={candidates}
              notifications={notifications}
              requisition={requisition}
              onCandidateMove={moveCandidateToPhase}
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
              onCandidateUpdate={handleCandidateChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};