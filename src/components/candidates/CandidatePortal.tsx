import React, { useState, useEffect } from 'react';
import { Search, User, Phone, Mail, MapPin, Camera, MessageCircle, Info, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useSupabaseQuery, useSupabaseMutation } from '../../hooks/useSupabase';
import CandidateProgressView from './CandidateProgressView';
import CandidateInfoModal from './CandidateInfoModal';
import CandidateChat from './CandidateChat';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  process_id: string;
  current_phase_id: string;
  resume_url?: string;
  photo_url?: string;
  location?: string;
  recruiter?: string;
  profile_data: any;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Phase {
  id: string;
  name: string;
  color: string;
  description?: string;
  order: number;
  created_at: string;
}

interface Process {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export default function CandidatePortal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [candidateData, setCandidateData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    photo: null as File | null
  });

  const { data: candidates, loading: candidatesLoading, refetch: refetchCandidates } = 
    useSupabaseQuery<Candidate>('selected_candidates', '*');
  
  const { data: phases, loading: phasesLoading } = 
    useSupabaseQuery<Phase>('phases', '*', { column: 'order', ascending: true });
  
  const { data: processes, loading: processesLoading } = 
    useSupabaseQuery<Process>('requisitions', '*');

  const { update, loading: updateLoading } = useSupabaseMutation<Candidate>('selected_candidates');

  const handleCandidateSearch = () => {
    if (!searchTerm.trim()) {
      alert('Por favor, ingrese su email o teléfono para buscar.');
      return;
    }

    const candidate = candidates.find(c => 
      c.email.toLowerCase() === searchTerm.toLowerCase() || 
      c.phone === searchTerm
    );

    if (candidate) {
      setSelectedCandidate(candidate);
      setCandidateData({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        location: candidate.location || '',
        photo: null
      });
    } else {
      alert('No se encontró ningún candidato con esa información.');
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/') && selectedCandidate) {
      try {
        // En una implementación real, subirías el archivo a un servidor
        const photoUrl = URL.createObjectURL(file);
        
        await update(selectedCandidate.id, { photo_url: photoUrl });
        setSelectedCandidate({ ...selectedCandidate, photo_url: photoUrl });
        refetchCandidates();
      } catch (error) {
        console.error('Error updating photo:', error);
        alert('Error al actualizar la foto');
      }
    }
  };

  const handleUpdateInfo = async () => {
    if (!selectedCandidate) return;

    try {
      await update(selectedCandidate.id, {
        name: candidateData.name,
        email: candidateData.email,
        phone: candidateData.phone,
        location: candidateData.location
      });
      
      setSelectedCandidate({
        ...selectedCandidate,
        name: candidateData.name,
        email: candidateData.email,
        phone: candidateData.phone,
        location: candidateData.location
      });
      
      refetchCandidates();
      alert('Información actualizada correctamente');
    } catch (error) {
      console.error('Error updating candidate:', error);
      alert('Error al actualizar la información');
    }
  };

  const getMissingData = (candidate: Candidate) => {
    const missing = [];
    if (!candidate.photo_url) missing.push('Fotografía personal');
    if (!candidate.location) missing.push('Ubicación');
    if (!candidate.resume_url) missing.push('Currículum Vitae');
    if (!candidate.profile_data?.summary) missing.push('Resumen profesional');
    if (!candidate.profile_data?.experience?.length) missing.push('Experiencia laboral');
    if (!candidate.profile_data?.education?.length) missing.push('Educación');
    if (!candidate.profile_data?.skills?.length) missing.push('Habilidades');
    return missing;
  };

  const getCurrentProcess = (candidate: Candidate) => {
    return processes.find(p => p.id === candidate.process_id);
  };

  if (candidatesLoading || phasesLoading || processesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!selectedCandidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Portal del Candidato</h1>
            <p className="text-gray-600">Consulte el estado de su proceso de selección</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email o Teléfono
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCandidateSearch()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su email o teléfono"
              />
            </div>

            <button
              onClick={handleCandidateSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
            >
              <Search className="h-5 w-5 mr-2" />
              Buscar Mi Proceso
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">¿Necesita ayuda?</p>
                <p className="text-sm text-blue-700">
                  Ingrese el email o teléfono que utilizó al aplicar para consultar su proceso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentProcess = getCurrentProcess(selectedCandidate);
  const missingData = getMissingData(selectedCandidate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-primary-600 hover:text-blue-800 font-medium"
              >
                ← Volver a búsqueda
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Bienvenido, {selectedCandidate.name}</h1>
                <p className="text-gray-600">{currentProcess?.name || 'Proceso de Selección'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowInfoModal(true)}
                className="p-2 text-primary-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Información y documentos faltantes"
              >
                <Info className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowChat(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat de Soporte
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de Información Personal */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Mi Información</h2>
              
              {/* Foto del candidato */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer group">
                    {selectedCandidate.photo_url ? (
                      <img
                        src={selectedCandidate.photo_url}
                        alt={selectedCandidate.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 group-hover:opacity-75 transition-opacity"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors border-4 border-gray-200">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-6 w-6 text-white drop-shadow-lg" />
                    </div>
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">Click para cambiar foto</p>
              </div>

              {/* Formulario de información */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={candidateData.name}
                    onChange={(e) => setCandidateData({ ...candidateData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={candidateData.email}
                    onChange={(e) => setCandidateData({ ...candidateData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={candidateData.phone}
                    onChange={(e) => setCandidateData({ ...candidateData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={candidateData.location}
                    onChange={(e) => setCandidateData({ ...candidateData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ciudad, Estado"
                  />
                </div>

                <button
                  onClick={handleUpdateInfo}
                  disabled={updateLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  {updateLoading ? 'Actualizando...' : 'Actualizar Información'}
                </button>
              </div>

              {/* Alertas de datos faltantes */}
              {missingData.length > 0 && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Información Incompleta</p>
                      <p className="text-sm text-yellow-700">
                        Faltan {missingData.length} elementos por completar
                      </p>
                      <button
                        onClick={() => setShowInfoModal(true)}
                        className="text-yellow-600 hover:text-yellow-800 text-sm font-medium mt-1"
                      >
                        Ver detalles →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel de Progreso */}
          <div className="lg:col-span-2">
            <CandidateProgressView
              candidate={selectedCandidate}
              phases={phases}
              process={currentProcess}
            />
          </div>
        </div>
      </div>

      {/* Modales */}
      {showInfoModal && (
        <CandidateInfoModal
          candidate={selectedCandidate}
          missingData={missingData}
          onClose={() => setShowInfoModal(false)}
        />
      )}

      {showChat && (
        <CandidateChat
          candidate={selectedCandidate}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}