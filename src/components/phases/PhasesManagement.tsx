import React, { useState } from 'react';
import { Plus, Edit, Trash2, Circle, GripVertical } from 'lucide-react';
import { Phase } from '../../types';
import { handlePhaseDragStart, handlePhaseDragOver, handlePhaseDrop } from '@/utils/dragAndDrop';
import PhaseForm from '@/components/phases/PhasesForm';

interface PhaseManagerProps {
  phases: Phase[];
  onPhasesChange: (phases: Phase[]) => void;
}

export default function PhasesManagement({ phases, onPhasesChange }: PhaseManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);

  const handleAddPhase = () => {
    setEditingPhase(null);
    setShowForm(true);
  };

  const handleEditPhase = (phase: Phase) => {
    setEditingPhase(phase);
    setShowForm(true);
  };

  const handleDeletePhase = (phaseId: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta fase?')) {
      onPhasesChange(phases.filter(p => p.id !== phaseId));
    }
  };

  const handleFormSubmit = (phaseData: Omit<Phase, 'id' | 'createdAt'>) => {
    if (editingPhase) {
      onPhasesChange(phases.map(p => 
        p.id === editingPhase.id 
          ? { ...p, ...phaseData }
          : p
      ));
    } else {
      const maxOrder = phases.length > 0 ? Math.max(...phases.map(p => p.order)) : -1;
      const newPhase: Phase = {
        ...phaseData,
        id: Date.now().toString(),
        order: maxOrder + 1,
        createdAt: new Date()
      };
      onPhasesChange([...phases, newPhase]);
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Fases</h2>
          <p className="text-gray-600 mt-1">Configure las fases del proceso de selección</p>
        </div>
        <button
          onClick={handleAddPhase}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Fase
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {phases.length === 0 ? (
          <div className="p-8 text-center">
            <Circle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay fases configuradas</h3>
            <p className="text-gray-600 mb-4">Comience creando su primera fase del proceso de selección</p>
            <button
              onClick={handleAddPhase}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Primera Fase
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <p className="text-sm text-gray-600 flex items-center">
                <GripVertical className="h-4 w-4 mr-2" />
                Arrastra las fases para cambiar el orden en el tablero
              </p>
            </div>
            {sortedPhases.map((phase) => (
              <div 
                key={phase.id} 
                className="p-6 my-8 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-move"
                draggable
                onDragStart={(e) => handlePhaseDragStart(e, phase.id)}
                onDragOver={handlePhaseDragOver}
                onDrop={(e) => handlePhaseDrop(e, phase.id, phases, onPhasesChange)}
              >
                <div className="flex items-center space-x-4">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <div
                    className="w-4 h-4 rounded-full border-2"
                    style={{ backgroundColor: phase.color, borderColor: phase.color }}
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{phase.name}</h3>
                    {phase.description && (
                      <p className="text-gray-600 text-sm mt-1">{phase.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Orden: {phase.order + 1}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditPhase(phase)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePhase(phase.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
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