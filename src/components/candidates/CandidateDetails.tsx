import React from 'react';
import { X, Mail, Phone, Calendar, Briefcase, GraduationCap, Award, FileText, ExternalLink } from 'lucide-react';
import { Candidate } from '../../types';

interface CandidateDetailsProps {
  candidate: Candidate;
  onClose: () => void;
}

export default function CandidateDetails({ candidate, onClose }: CandidateDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
            <p className="text-gray-600">{candidate.position}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información de Contacto */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Información de Contacto
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${candidate.email}`} className="hover:text-blue-600">
                      {candidate.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${candidate.phone}`} className="hover:text-blue-600">
                      {candidate.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Registrado: {new Date(candidate.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* CV */}
              {candidate.resumeUrl && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Currículum Vitae
                  </h4>
                  <button
                    onClick={() => window.open(candidate.resumeUrl, '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver CV en PDF
                  </button>
                </div>
              )}

              {/* Habilidades */}
              {candidate.profileData.skills.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Habilidades
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Experiencia y Educación */}
            <div className="lg:col-span-2 space-y-6">
              {/* Resumen */}
              {candidate.profileData.summary && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Resumen Profesional</h4>
                  <p className="text-gray-700 leading-relaxed">{candidate.profileData.summary}</p>
                </div>
              )}

              {/* Experiencia Laboral */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Experiencia Laboral
                </h4>
                {candidate.profileData.experience.length === 0 ? (
                  <p className="text-gray-500">No hay experiencia laboral registrada</p>
                ) : (
                  <div className="space-y-4">
                    {candidate.profileData.experience.map((exp) => (
                      <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900">{exp.position}</h5>
                            <p className="text-blue-600 font-medium">{exp.company}</p>
                          </div>
                          <div className="text-sm text-gray-500 text-right">
                            <p>{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</p>
                            {exp.current && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Actual
                              </span>
                            )}
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Educación */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Educación
                </h4>
                {candidate.profileData.education.length === 0 ? (
                  <p className="text-gray-500">No hay información educativa registrada</p>
                ) : (
                  <div className="space-y-4">
                    {candidate.profileData.education.map((edu) => (
                      <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                            <p className="text-blue-600 font-medium">{edu.institution}</p>
                            <p className="text-gray-600 text-sm">{edu.field}</p>
                          </div>
                          <div className="text-sm text-gray-500 text-right">
                            {edu.current ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                En curso
                              </span>
                            ) : (
                              <p>{edu.graduationDate}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}