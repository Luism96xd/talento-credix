import React from 'react';
import { X, AlertCircle, CheckCircle, Upload, FileText, User, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

interface CandidateInfoModalProps {
  candidate: any;
  missingData: string[];
  onClose: () => void;
}

export default function CandidateInfoModal({ candidate, missingData, onClose }: CandidateInfoModalProps) {
  const requiredDocuments = [
    { key: 'photo_url', label: 'Fotografía Personal', icon: User, description: 'Una foto clara de su rostro para identificación' },
    { key: 'resume_url', label: 'Currículum Vitae', icon: FileText, description: 'Su CV actualizado en formato PDF' },
    { key: 'location', label: 'Ubicación', icon: MapPin, description: 'Ciudad y estado donde reside' },
    { key: 'profile_data.summary', label: 'Resumen Profesional', icon: Briefcase, description: 'Breve descripción de su experiencia y objetivos' },
    { key: 'profile_data.experience', label: 'Experiencia Laboral', icon: Briefcase, description: 'Historial de trabajos anteriores' },
    { key: 'profile_data.education', label: 'Educación', icon: GraduationCap, description: 'Estudios realizados y certificaciones' },
    { key: 'profile_data.skills', label: 'Habilidades', icon: Award, description: 'Competencias técnicas y blandas' }
  ];

  const getFieldValue = (candidate: any, key: string) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      return candidate[parent]?.[child];
    }
    return candidate[key];
  };

  const isFieldComplete = (key: string) => {
    const value = getFieldValue(candidate, key);
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return Boolean(value);
  };

  const completedCount = requiredDocuments.filter(doc => isFieldComplete(doc.key)).length;
  const completionPercentage = Math.round((completedCount / requiredDocuments.length) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Información del Perfil</h3>
            <p className="text-gray-600">Estado de completitud de su información</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Progreso General */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-900">Progreso de Completitud</h4>
              <span className="text-2xl font-bold text-primary-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {completedCount} de {requiredDocuments.length} elementos completados
            </p>
          </div>

          {/* Lista de Documentos/Información */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Estado de la Información</h4>
            
            {requiredDocuments.map((doc) => {
              const isComplete = isFieldComplete(doc.key);
              const Icon = doc.icon;
              
              return (
                <div
                  key={doc.key}
                  className={`flex items-start space-x-4 p-4 rounded-lg border-2 ${
                    isComplete 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    isComplete ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      isComplete ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-gray-900">{doc.label}</h5>
                      {isComplete ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      isComplete 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {isComplete ? 'Completado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Instrucciones */}
          {missingData.length > 0 && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-primary-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Instrucciones para Completar</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>• Complete la información faltante en el panel izquierdo</p>
                    <p>• Suba los documentos requeridos cuando sea necesario</p>
                    <p>• Mantenga su información actualizada durante todo el proceso</p>
                    <p>• Use el chat de soporte si tiene dudas sobre algún documento</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {missingData.length === 0 && (
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">¡Perfil Completo!</h4>
                  <p className="text-sm text-green-800">
                    Su información está completa. Continuaremos con el proceso de selección.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}