import React from 'react';
import { CheckCircle, Clock, Circle, Calendar, User, Briefcase } from 'lucide-react';

interface CandidateProgressViewProps {
  candidate: any;
  phases: any[];
  process: any;
}

export default function CandidateProgressView({ candidate, phases, process }: CandidateProgressViewProps) {
  const currentPhase = phases.find(p => p.id === candidate.current_phase_id);
  const currentPhaseIndex = phases.findIndex(p => p.id === candidate.current_phase_id);
  
  const getPhaseStatus = (phaseIndex: number) => {
    if (phaseIndex < currentPhaseIndex) return 'completed';
    if (phaseIndex === currentPhaseIndex) return 'current';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'current':
        return <Clock className="h-6 w-6 text-blue-500" />;
      default:
        return <Circle className="h-6 w-6 text-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  const progressPercentage = phases.length > 0 
    ? Math.round(((currentPhaseIndex + 1) / phases.length) * 100)
    : 0;

  if (candidate.status === 'hired') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">¡Felicitaciones!</h2>
          <p className="text-lg text-gray-900 mb-4">Ha sido seleccionado para la posición</p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">{candidate.position}</p>
            <p className="text-green-700 text-sm">{process?.name}</p>
          </div>
          <p className="text-gray-600">
            Pronto recibirá más información sobre los siguientes pasos.
          </p>
        </div>
      </div>
    );
  }

  if (candidate.status === 'rejected') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Circle className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Proceso Finalizado</h2>
          <p className="text-lg text-gray-900 mb-4">Su proceso terminó en esta fase</p>
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium">{currentPhase?.name}</p>
            <p className="text-red-700 text-sm">{process?.name}</p>
          </div>
          <p className="text-gray-600">
            Agradecemos su interés en formar parte de nuestro equipo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estado Actual */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Estado de su Proceso</h2>
            <p className="text-gray-600">{process?.name}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{progressPercentage}%</p>
            <p className="text-sm text-gray-500">Completado</p>
          </div>
        </div>

        {/* Barra de Progreso */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso del proceso</span>
            <span>Fase {currentPhaseIndex + 1} de {phases.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Fase Actual */}
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Usted se encuentra en esta fase:</p>
              <p className="text-lg font-bold text-blue-800">{currentPhase?.name}</p>
              {currentPhase?.description && (
                <p className="text-blue-700 text-sm mt-1">{currentPhase.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline de Fases */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Fases del Proceso</h3>
        
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const status = getPhaseStatus(index);
            const isLast = index === phases.length - 1;
            
            return (
              <div key={phase.id} className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${
                          status === 'current' ? 'text-blue-900' : 
                          status === 'completed' ? 'text-green-900' : 'text-gray-500'
                        }`}>
                          {phase.name}
                        </p>
                        {phase.description && (
                          <p className={`text-sm ${
                            status === 'current' ? 'text-blue-700' : 
                            status === 'completed' ? 'text-green-700' : 'text-gray-400'
                          }`}>
                            {phase.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          status === 'current' ? 'bg-blue-100 text-blue-800' :
                          status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {status === 'current' ? 'En Proceso' :
                           status === 'completed' ? 'Completada' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Línea conectora */}
                {!isLast && (
                  <div className="absolute left-3 top-8 w-0.5 h-8 bg-gray-200"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Información del Proceso */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Proceso</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Briefcase className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Posición</p>
              <p className="font-medium text-gray-900">{candidate.position}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Fecha de Aplicación</p>
              <p className="font-medium text-gray-900">
                {new Date(candidate.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {candidate.recruiter && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Reclutador Asignado</p>
                <p className="font-medium text-gray-900">{candidate.recruiter}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Última Actualización</p>
              <p className="font-medium text-gray-900">
                {new Date(candidate.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}