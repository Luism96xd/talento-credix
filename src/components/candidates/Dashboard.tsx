import React, { useState } from 'react';
import { LayoutGrid, List, ExternalLink } from 'lucide-react';
import { Phase, Candidate, ViewMode, NotificationConfig } from '../../types';
import KanbanBoard from './KanbanBoard';
import CandidateTable from './CandidateTable';
import CandidateDetails from './CandidateDetails';

interface DashboardProps {
  phases: Phase[];
  candidates: Candidate[];
  notifications: NotificationConfig[];
  onCandidatesChange: (candidates: Candidate[]) => void;
}

export default function Dashboard({ phases, candidates, notifications, onCandidatesChange }: DashboardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const activeCandidates = candidates.filter(c => c.status === 'active');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tablero de Candidatos</h2>
          <p className="text-gray-600 mt-1">
            {activeCandidates.length} candidatos activos en proceso
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <a
            href="/registro"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Formulario Público
          </a>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="h-4 w-4 mr-1" />
              Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'table'
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

      {viewMode === 'kanban' ? (
        <KanbanBoard
          phases={phases}
          candidates={candidates}
          notifications={notifications}
          onCandidatesChange={onCandidatesChange}
          onCandidateClick={setSelectedCandidate}
        />
      ) : (
        <CandidateTable
          candidates={candidates}
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
  );
}