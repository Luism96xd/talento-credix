
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Eye, Calendar, MapPin, GraduationCap, List, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CandidateModal } from '@/components/CandidateModal';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  experience: string;
  education: string;
  appliedDate: string;
  cvUrl?: string;
  skills: string[];
}

interface Phase {
  id: string;
  name: string;
  color: string;
  candidates: Candidate[];
}

const mockPhases: Phase[] = [
  {
    id: 'review',
    name: 'En Revisión',
    color: '#fef08a',
    candidates: [
      {
        id: '1',
        name: 'Ana García Martínez',
        email: 'ana.garcia@email.com',
        phone: '+52 33 1234-5678',
        position: 'Desarrollador Frontend',
        location: 'Guadalajara, MX',
        experience: '3 años en desarrollo web con React y TypeScript',
        education: 'Licenciatura en Sistemas Computacionales - Universidad de Guadalajara',
        appliedDate: '2024-01-15',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript']
      },
      {
        id: '2',
        name: 'Carlos Rodríguez López',
        email: 'carlos.rodriguez@email.com',
        phone: '+52 33 8765-4321',
        position: 'Analista de Marketing',
        location: 'Zapopan, MX',
        experience: '5 años en marketing digital y análisis de datos',
        education: 'Licenciatura en Mercadotecnia - ITESO',
        appliedDate: '2024-01-14',
        skills: ['Google Analytics', 'SEO', 'SEM', 'Social Media']
      }
    ]
  },
  {
    id: 'testing',
    name: 'Pruebas Psicotécnicas',
    color: '#c4b5fd',
    candidates: [
      {
        id: '3',
        name: 'María Elena Flores',
        email: 'maria.flores@email.com',
        phone: '+52 33 5555-1234',
        position: 'Gerente de Recursos Humanos',
        location: 'Guadalajara, MX',
        experience: '8 años en gestión de recursos humanos',
        education: 'Maestría en Administración - ITESM',
        appliedDate: '2024-01-10',
        skills: ['Gestión de Personal', 'Reclutamiento', 'Capacitación', 'Liderazgo']
      }
    ]
  },
  {
    id: 'interview-hr',
    name: 'Entrevista Captación',
    color: '#93c5fd',
    candidates: []
  },
  {
    id: 'interview-mgmt',
    name: 'Entrevista Gerencia',
    color: '#86efac',
    candidates: []
  },
  {
    id: 'medical',
    name: 'Exámenes Médicos',
    color: '#f8b4d3',
    candidates: []
  },
  {
    id: 'offer',
    name: 'Oferta Salarial',
    color: '#fdba74',
    candidates: []
  }
];

export function KanbanBoard() {
  const [phases, setPhases] = useState<Phase[]>(mockPhases);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reorder within same column
      const phaseIndex = phases.findIndex(phase => phase.id === source.droppableId);
      const newCandidates = Array.from(phases[phaseIndex].candidates);
      const [reorderedItem] = newCandidates.splice(source.index, 1);
      newCandidates.splice(destination.index, 0, reorderedItem);

      const newPhases = [...phases];
      newPhases[phaseIndex].candidates = newCandidates;
      setPhases(newPhases);
    } else {
      // Move between columns
      const sourcePhaseIndex = phases.findIndex(phase => phase.id === source.droppableId);
      const destPhaseIndex = phases.findIndex(phase => phase.id === destination.droppableId);
      
      const sourceCandidates = Array.from(phases[sourcePhaseIndex].candidates);
      const destCandidates = Array.from(phases[destPhaseIndex].candidates);
      const [movedCandidate] = sourceCandidates.splice(source.index, 1);
      destCandidates.splice(destination.index, 0, movedCandidate);

      const newPhases = [...phases];
      newPhases[sourcePhaseIndex].candidates = sourceCandidates;
      newPhases[destPhaseIndex].candidates = destCandidates;
      setPhases(newPhases);
    }
  };

  const CandidateCard = ({ candidate, index }: { candidate: Candidate; index: number }) => (
    <Draggable draggableId={candidate.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`kanban-card ${snapshot.isDragging ? 'shadow-lg' : ''}`}
          onDoubleClick={() => setSelectedCandidate(candidate)}
        >
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-semibold text-foreground text-sm">{candidate.name}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCandidate(candidate);
              }}
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">{candidate.position}</p>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(candidate.appliedDate).toLocaleDateString('es-MX')}</span>
            </div>
            <div className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              <span className="truncate">{candidate.education.split(' - ')[0]}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {candidate.skills.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 2}
              </Badge>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lista de Candidatos</h1>
            <p className="text-muted-foreground">Vista en tabla del proceso de selección</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setViewMode('kanban')}
              className="flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              Vista Kanban
            </Button>
          </div>
        </div>

        <div className="form-section">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Candidato</th>
                  <th className="text-left p-4">Posición</th>
                  <th className="text-left p-4">Fase Actual</th>
                  <th className="text-left p-4">Fecha Aplicación</th>
                  <th className="text-left p-4">Ubicación</th>
                  <th className="text-left p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {phases.flatMap(phase => 
                  phase.candidates.map(candidate => (
                    <tr key={candidate.id} className="border-b hover:bg-muted/30">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">{candidate.email}</div>
                        </div>
                      </td>
                      <td className="p-4">{candidate.position}</td>
                      <td className="p-4">
                        <Badge 
                          style={{ backgroundColor: phase.color }}
                          className="text-foreground"
                        >
                          {phase.name}
                        </Badge>
                      </td>
                      <td className="p-4">{new Date(candidate.appliedDate).toLocaleDateString('es-MX')}</td>
                      <td className="p-4">{candidate.location}</td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCandidate(candidate)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedCandidate && (
          <CandidateModal 
            candidate={selectedCandidate} 
            onClose={() => setSelectedCandidate(null)} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tablero Kanban</h1>
          <p className="text-muted-foreground">Seguimiento del proceso de selección de candidatos</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2"
          >
            <List className="h-4 w-4" />
            Vista Lista
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {phases.map((phase) => (
            <div key={phase.id} className="kanban-column">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: phase.color }}
                  />
                  <h3 className="font-semibold text-foreground">{phase.name}</h3>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {phase.candidates.length}
                </Badge>
              </div>

              <Droppable droppableId={phase.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[400px] ${
                      snapshot.isDraggingOver ? 'bg-muted/50 rounded-lg' : ''
                    }`}
                  >
                    {phase.candidates.map((candidate, index) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {selectedCandidate && (
        <CandidateModal 
          candidate={selectedCandidate} 
          onClose={() => setSelectedCandidate(null)} 
        />
      )}
    </div>
  );
}
