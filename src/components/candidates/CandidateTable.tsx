import React from 'react';
import { Mail, Phone, Calendar, Eye } from 'lucide-react';
import { Candidate, Phase } from '../../types';

interface CandidateTableProps {
  candidates: Candidate[];
  phases: Phase[];
  onCandidateClick: (candidate: Candidate) => void;
}

export default function CandidateTable({ candidates, phases, onCandidateClick }: CandidateTableProps) {
  const getPhase = (phaseId: string) => phases.find(p => p.id === phaseId);
  const activeCandidates = candidates.filter(c => c.status === 'active');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Candidato</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Posición</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Contacto</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Fase Actual</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha Registro</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {activeCandidates.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  No hay candidatos registrados
                </td>
              </tr>
            ) : (
              activeCandidates.map((candidate) => {
                const currentPhase = getPhase(candidate.currentPhaseId);
                
                return (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{candidate.name}</p>
                        {candidate.profileData.experience.length > 0 && (
                          <p className="text-sm text-gray-600">
                            {candidate.profileData.experience[0].company}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{candidate.position}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" />
                          {candidate.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-3 w-3 mr-1" />
                          {candidate.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {currentPhase ? (
                        <span
                          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full text-white"
                          style={{ backgroundColor: currentPhase.color }}
                        >
                          {currentPhase.name}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Fase no encontrada</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(candidate.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => onCandidateClick(candidate)}
                        className="text-blue-600 hover:text-blue-900 font-medium text-sm flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}