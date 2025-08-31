import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, rectIntersection } from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import { CandidateCard } from './CandidateCard';
import InvitationModal from './InvitationModal';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Phase, Candidate, NotificationConfig, Recruiter, InvitationData, Requisition } from '@/types';
import { toast } from 'sonner';
import { executeNotification } from '@/utils/notifications';
import { supabase } from '@/integrations/supabase/client';

interface KanbanBoardProps {
  phases: Phase[];
  candidates: Candidate[];
  notifications: NotificationConfig[];
  requisition: Requisition;
  onCandidateClick: (candidate: Candidate) => void;
  onCandidateMove: (candidateId: string, fromPhaseId: string, toPhaseId: string) => void;
}

export default function KanbanBoard({
  phases,
  candidates,
  notifications,
  requisition,
  onCandidateMove,
  onCandidateClick,
}: KanbanBoardProps) {
  const navigate = useNavigate();
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);

  const handleDragStart = (event: any) => {
    const candidate = candidates.find(c => c.id === event.active.id);
    setActiveCandidate(candidate || null);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over, collisions } = event;
    setActiveCandidate(null);

    if (!over) return;

    const isOverPhase = over.data.current?.type === 'phase';
    const newPhaseId = isOverPhase ? over.id : over.data.current?.candidate?.current_phase_id;

    const candidateId = active.id;
    const candidate = candidates.find(c => c.id === candidateId);

    if (!candidate || candidate.current_phase_id === newPhaseId) return;

    const oldPhaseId = candidate.current_phase_id;
    // Update candidate position
    onCandidateMove(candidateId, oldPhaseId, newPhaseId);

    // Send notifications
    await sendNotifications(candidateId, oldPhaseId, newPhaseId);

    toast.success('Candidato movido exitosamente');
  };

  const sendNotifications = async (candidateId: string, fromPhaseId: string, toPhaseId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    const fromPhase = phases.find(p => p.id === fromPhaseId);
    const toPhase = phases.find(p => p.id === toPhaseId);

    if (toPhase.final_phase) {
      const { error } = await supabase.from('requisitons')
        .update({status: 'closed'})
        .eq('id', candidate.requisition_id)
    }

    const relevantNotifications = notifications.filter(notification => {
      if (!notification.enabled) return false;

      const { triggers } = notification;
      return triggers.allPhases ||
        (triggers.fromPhaseId === fromPhaseId && triggers.toPhaseId === toPhaseId) ||
        (triggers.toPhaseId === toPhaseId && triggers.fromPhaseId === "");
    });
    console.log(relevantNotifications)
    for (const notification of relevantNotifications) {
      try {
        await executeNotification(notification, candidate, fromPhase, toPhase);
      } catch (error) {
        console.error('Error sending notification:', error);
        toast.error(`Error enviando notificación: ${notification.name}`);
      }
    }
  };

  const getCandidatesByPhase = (phaseId: string) => {
    return candidates.filter(candidate => candidate.current_phase_id === phaseId);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex space-x-4 overflow-x-auto pb-4 min-h-[600px]">
        {phases.map((phase) => (
          <KanbanColumn
            key={phase.id}
            phase={phase}
            onCandidateClick={(candidate) => onCandidateClick(candidate)}
            candidates={getCandidatesByPhase(phase.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeCandidate ? (
          <CandidateCard
            candidate={activeCandidate}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}