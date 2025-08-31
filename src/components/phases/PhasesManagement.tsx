import  { useState } from 'react';
import { Plus, Edit, Trash2, Circle, GripVertical } from 'lucide-react';
import { Phase } from '../../types';
import { handlePhaseDragStart, handlePhaseDragOver, handlePhaseDrop } from '@/utils/dragAndDrop';
import PhaseForm from '@/components/phases/PhasesForm';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PhaseManagerProps {
  phases: Phase[];
  onPhasesChange: (phases: Phase[]) => void;
}

export default function PhasesManagement({ phases, onPhasesChange }: PhaseManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const { toast } = useToast()
  const handleAddPhase = () => {
    setEditingPhase(null);
    setShowForm(true);
  };

  const handleEditPhase = (phase: Phase) => {
    setEditingPhase(phase);
    setShowForm(true);
  };

  const handleDeletePhase = async (phaseId: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta fase?')) {
      try {
        await supabase.from('phases').delete().eq('id', phaseId)
      } catch (error) {
        console.error(error)
      }
      onPhasesChange(phases.filter(p => p.id !== phaseId));
    }
  };

  const handleFormSubmit = async (phaseData: Omit<Phase, 'id' | 'created_at'>) => {
    if (editingPhase) {
      try {
        const { error } = await supabase.from('phases').update(phaseData).eq('id', editingPhase.id);
        if (error) throw error;
        onPhasesChange(phases.map(p =>
          p.id === editingPhase.id
            ? { ...p, ...phaseData }
            : p
        ));
        toast({ title: "Éxito", description: "Fase actualizada correctamente.", variant: "default" });
      } catch (error) {
        console.error("Error al actualizar la fase:", error.message);
        toast({
          title: "Error",
          description: `Hubo un error al actualizar la fase: ${error.message || 'Inténtelo de nuevo.'}`,
          variant: "destructive"
        });
      }
    } else {
      try {
        const maxOrder = phases.length > 0 ? Math.max(...phases.map(p => p.order)) : -1;
        const newPhase: Phase = {
          ...phaseData,
          order: maxOrder + 1,
          created_at: new Date()
        };
        const { error } = await supabase.from('phases').insert(newPhase)
        if (error) throw error;
        onPhasesChange([...phases, newPhase]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un error al crear la fase",
          variant: "destructive"
        });
      }
    }
    setShowForm(false);
    setEditingPhase(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPhase(null);
  };

  // Sort phases by order
  const sortedPhases = [...phases].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Fases</h1>
          <p className="text-muted-foreground">Configura las fases del proceso de selección</p>
        </div>
        <Button
          onClick={handleAddPhase}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nueva Fase
        </Button>
      </div>

      <div>
        {phases.length === 0 ? (
          <div className="p-8 text-center">
            <Circle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay fases configuradas</h3>
            <p className="text-gray-600 mb-4">Comience creando su primera fase del proceso de selección</p>
            <button
              onClick={handleAddPhase}
              className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Primera Fase
            </button>
          </div>
        ) : (
          <div className="form-section">
            <h2 className="text-lg font-semibold mb-4">Fases Configuradas</h2>
            <div className="grid gap-4">

              {sortedPhases.map((phase) => (
                <Card
                  draggable
                  onDragStart={(e) => handlePhaseDragStart(e, phase.id)}
                  onDragOver={handlePhaseDragOver}
                  onDrop={(e) => handlePhaseDrop(e, phase.id, phases, onPhasesChange)}
                >
                  <CardContent key={phase.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <GripVertical className="h-5 w-5 text-gray-400" />
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
                        onClick={() => handleEditPhase(phase)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePhase(phase.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

              ))}
            </div>
          </div>
        )}

      </div>

      {showForm && (
        <PhaseForm
          phase={editingPhase}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}