import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CandidateCard } from './CandidateCard';
import { Phase, Candidate } from '@/types';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  phase: Phase;
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
}

export function KanbanColumn({ phase, candidates, onCandidateClick}: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: phase.id,
    data: {
      type: 'phase',
      phase,
    },
  });

  return (
    <div
      ref={setNodeRef}
      aria-label={`Kanban column for phase: ${phase.name}`}
      className={cn(
        'rounded-lg border-2 border-transparent p-4 transition-all duration-200 w-80 flex-shrink-0 bg-gray-50 rounded-xl',
        isOver && 'border-primary border-dashed border-2 bg-primary/5 scale-[1.02]'
      )}
    >
      {/* Column Header */}
      <div className="py-2 px-4 border-b border-gray-200 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: phase.color }}
            />
            <h3 className="font-semibold text-gray-900">{phase.name}</h3>
          </div>
          <span className="bg-white text-gray-600 text-sm font-medium px-2 py-1 rounded-full">
            {candidates.length}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {candidates.length === 0 && (
        <div className="flex h-32 items-center justify-center rounded-lg bg-muted/50 text-center">
          <p className="text-sm text-muted-foreground">
            No hay candidatos en esta fase
          </p>
        </div>
      )}

      {/* Candidates */}
      <SortableContext items={candidates.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onClick={() => onCandidateClick(candidate)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}