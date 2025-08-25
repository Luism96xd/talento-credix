import React, { useState } from 'react';
import { Plus, Edit, Trash2, Briefcase, ToggleLeft, ToggleRight } from 'lucide-react';
import { Process, Phase } from '@/types';
import ProcessForm from './ProcessForm';

interface ProcessManagerProps {
  processes: Process[];
  phases: Phase[];
  onProcessesChange: (processes: Process[]) => void;
}

export default function ProcessManager({ processes, phases, onProcessesChange }: ProcessManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingProcess, setEditingProcess] = useState<Process | null>(null);

  const handleAddProcess = () => {
    setEditingProcess(null);
    setShowForm(true);
  };

  const handleEditProcess = (process: Process) => {
    setEditingProcess(process);
    setShowForm(true);
  };

  const handleDeleteProcess = (processId: string) => {
    if (confirm('¿Está seguro de que desea eliminar este proceso?')) {
      onProcessesChange(processes.filter(p => p.id !== processId));
    }
  };

  const handleToggleActive = (processId: string) => {
    onProcessesChange(processes.map(p => 
      p.id === processId ? { ...p, is_active: !p.is_active } : p
    ));
  };

  const handleFormSubmit = (processData: Omit<Process, 'id' | 'createdAt'>) => {
    if (editingProcess) {
      onProcessesChange(processes.map(p => 
        p.id === editingProcess.id 
          ? { ...p, ...processData }
          : p
      ));
    } else {
      const newProcess: Process = {
        ...processData,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      onProcessesChange([...processes, newProcess]);
    }
    setShowForm(false);
    setEditingProcess(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProcess(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Procesos</h2>
          <p className="text-gray-600 mt-1">Configure los procesos de selección de la empresa</p>
        </div>
        <button
          onClick={handleAddProcess}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Proceso
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {processes.length === 0 ? (
          <div className="p-8 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay procesos configurados</h3>
            <p className="text-gray-600 mb-4">Comience creando su primer proceso de selección</p>
            <button
              onClick={handleAddProcess}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Proceso
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {processes.map((process) => (
              <div key={process.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{process.name}</h3>
                      <button
                        onClick={() => window.location.hash = `#dashboard?process=${process.id}`}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors"
                      >
                        Ver Candidatos
                      </button>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        process.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {process.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    {process.description && (
                      <p className="text-gray-600 text-sm mb-3">{process.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {process.phases.map((phase) => (
                        <span
                          key={phase.id}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full text-white"
                          style={{ backgroundColor: phase.color }}
                        >
                          {phase.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleActive(process.id)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      {process.is_active ? (
                        <ToggleRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEditProcess(process)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProcess(process.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ProcessForm
          process={editingProcess}
          phases={phases}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}