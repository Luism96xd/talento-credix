import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, GripVertical, Calendar, Briefcase } from 'lucide-react';
import { Candidate } from '@/types';
import { cn } from '@/lib/utils';

interface CandidateCardProps {
  candidate: Candidate;
  isDragging?: boolean;
  onClick?: () => void;
}

export function CandidateCard({ candidate, isDragging, onClick }: CandidateCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: candidate.id,
    data: {
      type: 'candidate',
      candidate,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragging = isDragging || isSortableDragging;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={cn(
        'group cursor-grab transition-all duration-200 hover:shadow-lg',
        dragging && 'shadow-xl rotate-3 scale-105 cursor-grabbing',
        'border border-border/50 bg-card'
      )}
    >
      <CardContent className="p-4">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="mb-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2 w-full">
            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            <Avatar className="h-8 w-8">
              <AvatarImage src={candidate.photo_url} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <h4 className="font-semibold text-gray-900 text-sm">{candidate.name}</h4>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center text-xs text-gray-600">
              <Mail className="h-3 w-3 mr-2" />
              <span className="truncate">{candidate.email}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Phone className="h-3 w-3 mr-2" />
              <span>{candidate.phone}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Calendar className="h-3 w-3 mr-2" />
              <span>{new Date(candidate.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {candidate.profileData?.experience.length > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <Briefcase className="h-3 w-3 mr-1" />
              <span className="truncate">
                {candidate.profileData?.experience[0].position} en {candidate.profileData?.experience[0].company}
              </span>
            </div>
          )}

          {candidate.profileData?.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {candidate.profileData?.skills.slice(0, 2).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {candidate.profileData?.skills.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{candidate.profileData?.skills.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}