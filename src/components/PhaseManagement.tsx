
import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from './ui/card';

interface Phase {
  id: string;
  name: string;
  color: string;
  description?: string;
}

const initialPhases: Phase[] = [
  {
    id: 'review',
    name: 'En Revisión',
    color: '#fef08a',
    description: 'Revisión inicial de documentos y perfil del candidato'
  },
  {
    id: 'testing',
    name: 'Pruebas Psicotécnicas',
    color: '#c4b5fd',
    description: 'Evaluaciones psicológicas y técnicas especializadas'
  },
  {
    id: 'interview-hr',
    name: 'Entrevista con Captación',
    color: '#93c5fd',
    description: 'Primera entrevista con el departamento de recursos humanos'
  },
  {
    id: 'interview-mgmt',
    name: 'Entrevista con Gerencia',
    color: '#86efac',
    description: 'Entrevista final con la gerencia del área correspondiente'
  },
  {
    id: 'medical',
    name: 'Exámenes Médicos',
    color: '#f8b4d3',
    description: 'Evaluaciones médicas ocupacionales requeridas'
  },
  {
    id: 'offer',
    name: 'Oferta Salarial',
    color: '#fdba74',
    description: 'Presentación y negociación de la oferta de trabajo'
  }
];

const colorOptions = [
  '#fef08a', '#fed7aa', '#fecaca', '#fca5a5', '#f9a8d4', '#f8b4d3',
  '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9',
  '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8',
  '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d',
  '#fde68a', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#dc2626'
];

export function PhaseManagement() {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPhase, setNewPhase] = useState<Omit<Phase, 'id'>>({
    name: '',
    color: colorOptions[0],
    description: ''
  });

  const handleCreate = () => {
    if (!newPhase.name.trim()) return;
    
    const phase: Phase = {
      id: Date.now().toString(),
      ...newPhase
    };
    
    setPhases([...phases, phase]);
    setNewPhase({ name: '', color: colorOptions[0], description: '' });
    setIsCreating(false);
  };

  const handleUpdate = () => {
    if (!editingPhase || !editingPhase.name.trim()) return;
    
    setPhases(phases.map(phase => 
      phase.id === editingPhase.id ? editingPhase : phase
    ));
    setEditingPhase(null);
  };

  const handleDelete = (id: string) => {
    setPhases(phases.filter(phase => phase.id !== id));
  };

  const PhaseForm = ({ 
    phase, 
    onChange, 
    onSave, 
    onCancel, 
    title 
  }: {
    phase: Omit<Phase, 'id'>;
    onChange: (phase: Omit<Phase, 'id'>) => void;
    onSave: () => void;
    onCancel: () => void;
    title: string;
  }) => (
    <div className="form-section">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre de la Fase</Label>
          <Input
            id="name"
            value={phase.name}
            onChange={(e) => onChange({ ...phase, name: e.target.value })}
            placeholder="Ej. Entrevista técnica"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Input
            id="description"
            value={phase.description || ''}
            onChange={(e) => onChange({ ...phase, description: e.target.value })}
            placeholder="Describe el propósito de esta fase"
          />
        </div>
        
        <div>
          <Label>Color de la Fase</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  phase.color === color ? 'border-foreground' : 'border-border'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onChange({ ...phase, color })}
              />
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={onSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Fases</h1>
          <p className="text-muted-foreground">Configura las fases del proceso de selección</p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nueva Fase
        </Button>
      </div>

      {/* Create Phase Form */}
      {isCreating && (
        <PhaseForm
          phase={newPhase}
          onChange={setNewPhase}
          onSave={handleCreate}
          onCancel={() => {
            setIsCreating(false);
            setNewPhase({ name: '', color: colorOptions[0], description: '' });
          }}
          title="Crear Nueva Fase"
        />
      )}

      {/* Edit Phase Form */}
      {editingPhase && (
        <PhaseForm
          phase={editingPhase}
          onChange={setEditingPhase}
          onSave={handleUpdate}
          onCancel={() => setEditingPhase(null)}
          title="Editar Fase"
        />
      )}

      {/* Phases List */}
      <div className="form-section">
        <h2 className="text-lg font-semibold mb-4">Fases Configuradas</h2>
        <div className="grid gap-4">
          {phases.map((phase) => (
                        <Card>
            <CardContent key={phase.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: phase.color }}
                />
                <div>
                  <h4 className="font-medium text-foreground">{phase.name}</h4>
                  {phase.description && (
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {phase.color}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingPhase(phase)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(phase.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
            </Card>

          ))}
          
          {phases.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No hay fases configuradas</p>
              <p className="text-sm">Crea tu primera fase para comenzar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
