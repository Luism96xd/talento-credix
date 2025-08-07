
import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from './ui/card';

interface Phase {
  id: string;
  name: string;
  color: string;
}

interface Process {
  id: string;
  name: string;
  description: string;
  phases: string[]; // Array of phase IDs
  isActive: boolean;
}

const mockPhases: Phase[] = [
  { id: 'review', name: 'En Revisión', color: '#fef08a' },
  { id: 'testing', name: 'Pruebas Psicotécnicas', color: '#c4b5fd' },
  { id: 'interview-hr', name: 'Entrevista con Captación', color: '#93c5fd' },
  { id: 'interview-mgmt', name: 'Entrevista con Gerencia', color: '#86efac' },
  { id: 'medical', name: 'Exámenes Médicos', color: '#f8b4d3' },
  { id: 'offer', name: 'Oferta Salarial', color: '#fdba74' }
];

const initialProcesses: Process[] = [
  {
    id: 'dev-process',
    name: 'Proceso de Desarrolladores',
    description: 'Proceso especializado para candidatos a posiciones de desarrollo de software',
    phases: ['review', 'testing', 'interview-hr', 'interview-mgmt', 'offer'],
    isActive: true
  },
  {
    id: 'mgmt-process',
    name: 'Proceso Gerencial',
    description: 'Proceso para posiciones de gerencia y liderazgo',
    phases: ['review', 'interview-hr', 'interview-mgmt', 'medical', 'offer'],
    isActive: true
  },
  {
    id: 'admin-process',
    name: 'Proceso Administrativo',
    description: 'Proceso estándar para posiciones administrativas y operativas',
    phases: ['review', 'interview-hr', 'medical', 'offer'],
    isActive: false
  }
];

export function ProcessManagement() {
  const [processes, setProcesses] = useState<Process[]>(initialProcesses);
  const [editingProcess, setEditingProcess] = useState<Process | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newProcess, setNewProcess] = useState<Omit<Process, 'id'>>({
    name: '',
    description: '',
    phases: [],
    isActive: true
  });

  const handleCreate = () => {
    if (!newProcess.name.trim()) return;
    
    const process: Process = {
      id: Date.now().toString(),
      ...newProcess
    };
    
    setProcesses([...processes, process]);
    setNewProcess({ name: '', description: '', phases: [], isActive: true });
    setIsCreating(false);
  };

  const handleUpdate = () => {
    if (!editingProcess || !editingProcess.name.trim()) return;
    
    setProcesses(processes.map(process => 
      process.id === editingProcess.id ? editingProcess : process
    ));
    setEditingProcess(null);
  };

  const handleDelete = (id: string) => {
    setProcesses(processes.filter(process => process.id !== id));
  };

  const toggleProcessStatus = (id: string) => {
    setProcesses(processes.map(process =>
      process.id === id ? { ...process, isActive: !process.isActive } : process
    ));
  };

  const ProcessForm = ({ 
    process, 
    onChange, 
    onSave, 
    onCancel, 
    title 
  }: {
    process: Omit<Process, 'id'>;
    onChange: (process: Omit<Process, 'id'>) => void;
    onSave: () => void;
    onCancel: () => void;
    title: string;
  }) => (
    <div className="form-section">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nombre del Proceso</Label>
            <Input
              id="name"
              value={process.name}
              onChange={(e) => onChange({ ...process, name: e.target.value })}
              placeholder="Ej. Proceso de Desarrollo"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={process.isActive}
              onCheckedChange={(checked) => onChange({ ...process, isActive: !!checked })}
            />
            <Label htmlFor="active" className="text-sm font-medium">
              Proceso Activo
            </Label>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Input
            id="description"
            value={process.description}
            onChange={(e) => onChange({ ...process, description: e.target.value })}
            placeholder="Describe el propósito y alcance de este proceso"
          />
        </div>
        
        <div>
          <Label className="text-base font-medium">Fases del Proceso</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Selecciona las fases que formarán parte de este proceso de selección
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockPhases.map((phase) => (
              <div key={phase.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <Checkbox
                  id={phase.id}
                  checked={process.phases.includes(phase.id)}
                  onCheckedChange={(checked) => {
                    const updatedPhases = checked
                      ? [...process.phases, phase.id]
                      : process.phases.filter(id => id !== phase.id);
                    onChange({ ...process, phases: updatedPhases });
                  }}
                />
                <div className="flex items-center gap-2 flex-1">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: phase.color }}
                  />
                  <Label htmlFor={phase.id} className="text-sm font-medium cursor-pointer">
                    {phase.name}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={onSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar Proceso
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
          <h1 className="text-2xl font-bold text-foreground">Gestión de Procesos</h1>
          <p className="text-muted-foreground">Configura los procesos de selección y sus fases</p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuevo Proceso
        </Button>
      </div>

      {/* Create Process Form */}
      {isCreating && (
        <ProcessForm
          process={newProcess}
          onChange={setNewProcess}
          onSave={handleCreate}
          onCancel={() => {
            setIsCreating(false);
            setNewProcess({ name: '', description: '', phases: [], isActive: true });
          }}
          title="Crear Nuevo Proceso"
        />
      )}

      {/* Edit Process Form */}
      {editingProcess && (
        <ProcessForm
          process={editingProcess}
          onChange={setEditingProcess}
          onSave={handleUpdate}
          onCancel={() => setEditingProcess(null)}
          title="Editar Proceso"
        />
      )}

      {/* Processes List */}
      <div className="form-section">
        <h2 className="text-lg font-semibold mb-4">Procesos Configurados</h2>
        <div className="space-y-4">
          {processes.map((process) => (
            <Card key={process.id} className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-primary-accent" />
                    <h4 className="font-semibold text-foreground">{process.name}</h4>
                    <Badge variant={process.isActive ? "default" : "secondary"}>
                      {process.isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{process.description}</p>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Fases del proceso ({process.phases.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {process.phases.map((phaseId) => {
                        const phase = mockPhases.find(p => p.id === phaseId);
                        return phase ? (
                          <Badge key={phaseId} variant="outline" className="flex items-center gap-1">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: phase.color }}
                            />
                            {phase.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleProcessStatus(process.id)}
                  >
                    {process.isActive ? 'Desactivar' : 'Activar'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProcess(process)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(process.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {processes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No hay procesos configurados</p>
              <p className="text-sm">Crea tu primer proceso para comenzar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
