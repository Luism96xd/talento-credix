import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Process, Phase } from '../../types';

interface ProcessFormProps {
  process: Process | null;
  phases: Phase[];
  onSubmit: (process: Omit<Process, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export default function ProcessForm({ process, phases, onSubmit, onClose }: ProcessFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
    selectedPhaseIds: [] as string[]
  });

  useEffect(() => {
    if (process) {
      setFormData({
        name: process.name,
        description: process.description || '',
        isActive: process.isActive,
        selectedPhaseIds: process.phases.map(p => p.id)
      });
    }
  }, [process]);

  const handlePhaseToggle = (phaseId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPhaseIds: prev.selectedPhaseIds.includes(phaseId)
        ? prev.selectedPhaseIds.filter(id => id !== phaseId)
        : [...prev.selectedPhaseIds, phaseId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPhases = phases.filter(p => formData.selectedPhaseIds.includes(p.id));
    
    onSubmit({
      name: formData.name,
      description: formData.description,
      isActive: formData.isActive,
      phases: selectedPhases
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {process ? 'Editar Proceso' : 'Nuevo Proceso'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Proceso
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Proceso de Selección - Vendedores"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción (opcional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Descripción del proceso de selección..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Proceso activo (visible para candidatos)
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Fases del Proceso
              </label>
              {phases.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No hay fases disponibles.</p>
                  <p className="text-gray-400 text-sm mt-1">Cree fases primero en la sección "Fases"</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {phases.map((phase) => (
                    <div
                      key={phase.id}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.selectedPhaseIds.includes(phase.id)
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handlePhaseToggle(phase.id)}
                    >
                      <div className="flex items-center flex-1">
                        <div
                          className="w-4 h-4 rounded-full border-2 mr-3"
                          style={{ backgroundColor: phase.color, borderColor: phase.color }}
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{phase.name}</h4>
                          {phase.description && (
                            <p className="text-sm text-gray-600">{phase.description}</p>
                          )}
                        </div>
                      </div>
                      {formData.selectedPhaseIds.includes(phase.id) && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}
              {formData.selectedPhaseIds.length === 0 && phases.length > 0 && (
                <p className="text-red-500 text-sm mt-2">Seleccione al menos una fase</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={formData.selectedPhaseIds.length === 0 && phases.length > 0}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              {process ? 'Actualizar' : 'Crear'} Proceso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}