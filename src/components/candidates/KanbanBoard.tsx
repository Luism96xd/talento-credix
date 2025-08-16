import React from 'react';
import { Users } from 'lucide-react';
import { Phase, Candidate, NotificationConfig } from '../../types';
import { handleDragOver, handleDrop } from '../../utils/dragAndDrop';
import { executeNotification } from '../../utils/notifications';
import CandidateCard from './CandidateCard';

interface KanbanBoardProps {
  phases: Phase[];
  candidates: Candidate[];
  notifications: NotificationConfig[];
  onCandidatesChange: (candidates: Candidate[]) => void;
  onCandidateClick: (candidate: Candidate) => void;
}

export default function KanbanBoard({ 
  phases, 
  candidates, 
  notifications,
  onCandidatesChange, 
  onCandidateClick 
}: KanbanBoardProps) {
  
  const handleCandidateDrop = async (e: React.DragEvent, phaseId: string) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('text/plain');
    
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate || candidate.currentPhaseId === phaseId) return;
    
    const fromPhase = phases.find(p => p.id === candidate.currentPhaseId);
    const toPhase = phases.find(p => p.id === phaseId);
    
    if (!toPhase) return;
    
    // Update candidate phase
    const updatedCandidates = candidates.map(c => 
      c.id === candidateId 
        ? { ...c, currentPhaseId: phaseId, updatedAt: new Date() }
        : c
    );
    
    onCandidatesChange(updatedCandidates);
    
    // Execute notifications
    for (const notification of notifications) {
      try {
        await executeNotification(notification, candidate, fromPhase || null, toPhase, phases);
      } catch (error) {
        console.error('Failed to execute notification:', error);
      }
    }
  };

  const getCandidatesForPhase = (phaseId: string) => {
    return candidates.filter(c => c.currentPhaseId === phaseId && c.status === 'active');
  };

  // Sort phases by order
  const sortedPhases = [...phases].sort((a, b) => a.order - b.order);

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
    <div className="flex space-x-4 overflow-x-auto pb-4 min-h-[600px]">
      {sortedPhases.map((phase) => {
        const phaseCandidates = getCandidatesForPhase(phase.id);
        
        return (
          <div 
            key={phase.id} 
            className="flex-shrink-0 w-80 bg-gray-50 rounded-xl"
            onDragOver={handleDragOver}
            onDrop={(e) => handleCandidateDrop(e, phase.id)}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: phase.color }}
                  />
                  <h3 className="font-semibold text-gray-900">{phase.name}</h3>
                </div>
                <span className="bg-white text-gray-600 text-sm font-medium px-2 py-1 rounded-full">
                  {phaseCandidates.length}
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {phaseCandidates.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">
                    No hay candidatos en esta fase
                  </p>
                </div>
              ) : (
                phaseCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onClick={() => onCandidateClick(candidate)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}