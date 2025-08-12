import { PhaseManagement } from "@/components/PhaseManagement";
import PhasesManagement from "@/components/phases/PhasesManagement";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Phase } from "@/types";


// Datos iniciales
const initialPhases: Phase[] = [
  {
    id: '1',
    name: 'En revisión',
    color: '#3B82F6',
    description: 'Revisión inicial de documentos y perfil',
    order: 0,
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'En pruebas psicotécnicas',
    color: '#8B5CF6',
    description: 'Evaluación psicológica y técnica',
    order: 1,
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Entrevista con captación',
    color: '#F59E0B',
    description: 'Primera entrevista con el equipo de reclutamiento',
    order: 2,
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Entrevista con la gerencia',
    color: '#EF4444',
    description: 'Entrevista final con el gerente del área',
    order: 3,
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'Exámenes médicos',
    color: '#10B981',
    description: 'Evaluación médica ocupacional',
    order: 4,
    createdAt: new Date()
  },
  {
    id: '6',
    name: 'Oferta salarial',
    color: '#06B6D4',
    description: 'Negociación y oferta final',
    order: 5,
    createdAt: new Date()
  }
];
export const Phases = () => {
  const [phases, setPhases] = useLocalStorage('phases', initialPhases);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PhaseManagement />
          <PhasesManagement
            phases={phases}
            onPhasesChange={setPhases}
          />
        </div>
      </div>
    </div>
  );
};