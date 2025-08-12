import { Candidate, Phase } from '../types';

export const handleDragStart = (e: React.DragEvent, candidateId: string) => {
  e.dataTransfer.setData('text/plain', candidateId);
  e.dataTransfer.effectAllowed = 'move';
};

export const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

export const handleDrop = (
  e: React.DragEvent,
  phaseId: string,
  candidates: Candidate[],
  setCandidates: (candidates: Candidate[]) => void
) => {
  e.preventDefault();
  const candidateId = e.dataTransfer.getData('text/plain');
  
  const updatedCandidates = candidates.map(candidate => 
    candidate.id === candidateId 
      ? { ...candidate, currentPhaseId: phaseId, updatedAt: new Date() }
      : candidate
  );
  
  setCandidates(updatedCandidates);
};

// Phase ordering drag and drop
export const handlePhaseDragStart = (e: React.DragEvent, phaseId: string) => {
  e.dataTransfer.setData('text/plain', phaseId);
  e.dataTransfer.effectAllowed = 'move';
};

export const handlePhaseDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

export const handlePhaseDrop = (
  e: React.DragEvent,
  targetPhaseId: string,
  phases: Phase[],
  setPhases: (phases: Phase[]) => void
) => {
  e.preventDefault();
  const draggedPhaseId = e.dataTransfer.getData('text/plain');
  
  if (draggedPhaseId === targetPhaseId) return;
  
  const draggedPhase = phases.find(p => p.id === draggedPhaseId);
  const targetPhase = phases.find(p => p.id === targetPhaseId);
  
  if (!draggedPhase || !targetPhase) return;
  
  const newPhases = [...phases];
  const draggedIndex = newPhases.findIndex(p => p.id === draggedPhaseId);
  const targetIndex = newPhases.findIndex(p => p.id === targetPhaseId);
  
  // Remove dragged phase
  newPhases.splice(draggedIndex, 1);
  
  // Insert at target position
  newPhases.splice(targetIndex, 0, draggedPhase);
  
  // Update order values
  const updatedPhases = newPhases.map((phase, index) => ({
    ...phase,
    order: index
  }));
  
  setPhases(updatedPhases);
};