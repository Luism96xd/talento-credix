import React from 'react';
import { X, Mail, Phone, Calendar, Briefcase, GraduationCap, Award, FileText, ExternalLink, Download, MapPin, User, Camera, FolderOpen, Upload, Plus, Trash2, Edit } from 'lucide-react';
import { Candidate } from '@/types';
import { useState } from 'react';
import { useSupabaseMutation } from '../../hooks/useSupabase';
import DocumentManager from '../DocumentManager';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CandidateDetailsProps {
  candidate: Candidate;
  onClose: () => void;
  onCandidateUpdate?: (candidate: Candidate) => void;
}

export default function CandidateDetails({ candidate, onClose, onCandidateUpdate }: CandidateDetailsProps) {
  const [showDocuments, setShowDocuments] = useState(false);
  const { toast } = useToast()

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // En una implementación real, subirías el archivo a un servidor
      try {
        const fileExt = file.name.split('.').pop();
        const newFileName = `${Date.now()}.${fileExt}`;
        const filePath = `photos/${candidate?.name.replace(/[^A-Za-z]/g, '')}_${candidate.id}/${newFileName}`;

        const { error: uploadError } = await supabase.storage
          .from('documentos')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage 
          .from('documentos')
          .getPublicUrl(filePath);


        if (!data || !data.publicUrl) {
          throw new Error("Failed to get public URL for job description.");
        }
        const photo_url = data.publicUrl;

        const updatedCandidate = await supabase
          .from('selected_candidates')
          .update({ photo_url: photo_url })
          .eq('id', candidate.id)

        if (updatedCandidate && onCandidateUpdate) {
          onCandidateUpdate({ ...candidate, photo_url: photo_url });
        }
      } catch (error) {
        console.error('Error updating photo:', error);
        alert('Error al actualizar la foto');
      }
    } else {
      alert('Por favor, seleccione una imagen válida.');
    }
  };

  const handleEditCandidate = async (candidate: Candidate) => {

  }

  const handleDeleteCandidate = async (candidateId: string) => {
    try {
      const { error } = await supabase
        .from('selected_candidates')
        .delete().eq('id', candidateId)
      if (error) throw error
      onCandidateUpdate && onCandidateUpdate(candidate);
      toast({
        title: 'Éxito',
        description: 'Candidato eliminado de forma satisfactoria'
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'Error al eliminar el candidato'
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                {candidate.photo_url ? (
                  <img
                    src={candidate.photo_url}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 group-hover:opacity-75 transition-opacity"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              </label>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.position}</p>
              {candidate?.location && (
                <p className="text-gray-500 text-sm flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {candidate.location}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditCandidate(candidate)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteCandidate(candidate.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setShowDocuments(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <FolderOpen className="h-4 w-4 mr-4" />
              Ver Carpeta
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
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
                    <a href={`mailto:${candidate.email}`} className="hover:text-primary-600">
                      {candidate.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${candidate.phone}`} className="hover:text-primary-600">
                      {candidate.phone}
                    </a>
                  </div>
                  {candidate?.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {candidate.location}
                    </div>
                  )}
                  {candidate?.recruiter && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      Reclutador: {candidate.recruiter}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Registrado: {new Date(candidate.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* CV */}
              {candidate.resume_url && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Currículum Vitae
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => window.open(candidate.resume_url, '_blank')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver CV en PDF
                    </button>
                    <a
                      href={candidate.resume_url}
                      download={`CV_${candidate.name.replace(/\s+/g, '_')}.pdf`}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar CV
                    </a>
                  </div>
                </div>
              )}

              {/* Habilidades */}
              {candidate.profileData?.skills.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Habilidades
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.profileData?.skills.map((skill, index) => (
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
              {candidate.profileData?.summary && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Resumen Profesional</h4>
                  <p className="text-gray-700 leading-relaxed">{candidate.profileData?.summary}</p>
                </div>
              )}

              {/* Experiencia Laboral */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Experiencia Laboral
                </h4>
                {candidate.profileData?.experience.length === 0 ? (
                  <p className="text-gray-500">No hay experiencia laboral registrada</p>
                ) : (
                  <div className="space-y-4">
                    {candidate.profileData?.experience.map((exp) => (
                      <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900">{exp.position}</h5>
                            <p className="text-primary-600 font-medium">{exp.company}</p>
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
                {candidate.profileData?.education.length === 0 ? (
                  <p className="text-gray-500">No hay información educativa registrada</p>
                ) : (
                  <div className="space-y-4">
                    {candidate.profileData?.education.map((edu) => (
                      <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                            <p className="text-primary-600 font-medium">{edu.institution}</p>
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

      {showDocuments && (
        <DocumentManager
          candidate={candidate}
          onClose={() => setShowDocuments(false)}
          onUpdate={() => onCandidateUpdate && onCandidateUpdate(candidate)}
        />
      )}
    </div>
  );
}