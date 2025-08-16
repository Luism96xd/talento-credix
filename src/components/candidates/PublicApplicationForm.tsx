import React, { useState } from 'react';
import { Upload, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Process, Candidate } from '../../types';

interface PublicApplicationFormProps {
  processes: Process[];
  onCandidateSubmit: (candidate: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function PublicApplicationForm({ processes, onCandidateSubmit }: PublicApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    processId: '',
    summary: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const activeProcesses = processes.filter(p => p.is_active);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Por favor, seleccione un archivo PDF válido.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.processId) {
      alert('Por favor, seleccione un proceso de selección.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const selectedProcess = processes.find(p => p.id === formData.processId);
      const firstPhase = selectedProcess?.phases[0];
      
      if (!firstPhase) {
        throw new Error('El proceso seleccionado no tiene fases configuradas');
      }

      // Simular subida de archivo y extracción de datos del CV
      let resumeUrl = '';
      const profileData = {
        experience: [] as any[],
        education: [] as any[],
        skills: [] as string[],
        summary: formData.summary
      };

      if (resumeFile) {
        // En una implementación real, aquí subirías el archivo a un servidor
        // y extraerías los datos del CV usando OCR o AI
        resumeUrl = URL.createObjectURL(resumeFile);
        
        // Datos de ejemplo extraídos del CV
        profileData.experience = [
          {
            id: '1',
            company: 'Empresa Ejemplo',
            position: 'Desarrollador',
            startDate: '2020-01-01',
            endDate: '2023-12-31',
            description: 'Desarrollo de aplicaciones web',
            current: false
          }
        ];
        
        profileData.education = [
          {
            id: '1',
            institution: 'Universidad Ejemplo',
            degree: 'Licenciatura',
            field: 'Ingeniería en Sistemas',
            graduationDate: '2019-12-01',
            current: false
          }
        ];
        
        profileData.skills = ['JavaScript', 'React', 'Node.js', 'Python'];
      }

      const candidateData: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        processId: formData.processId,
        currentPhaseId: firstPhase.id,
        resumeUrl,
        profileData,
        status: 'active'
      };

      onCandidateSubmit(candidateData);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        processId: '',
        summary: ''
      });
      setResumeFile(null);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Aplicación Enviada!</h2>
          <p className="text-gray-600 mb-6">
            Su aplicación ha sido recibida exitosamente. Nos pondremos en contacto pronto.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Enviar Otra Aplicación
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl  w-full">
        <div className="p-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mayoreo</h1>
          <p className="text-gray-600">Únete a nuestro equipo - Aplica ahora</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Su nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="su@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+52 xxx xxx xxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Posición Deseada *
              </label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Vendedor, Gerente, etc."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proceso de Selección *
              </label>
              <select
                required
                value={formData.processId}
                onChange={(e) => setFormData({ ...formData, processId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccione un proceso</option>
                {activeProcesses.map((process) => (
                  <option key={process.id} value={process.id}>
                    {process.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resumen Profesional (opcional)
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Cuéntanos sobre tu experiencia y objetivos profesionales..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currículum Vitae (PDF) *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                  required
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  {resumeFile ? (
                    <p className="text-green-600 font-medium">{resumeFile.name}</p>
                  ) : (
                    <>
                      <p className="text-gray-600 font-medium mb-2">
                        Haga clic para subir su CV
                      </p>
                      <p className="text-gray-500 text-sm">Solo archivos PDF</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700 text-sm">
                Hubo un error al enviar su aplicación. Por favor, inténtelo de nuevo.
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium flex items-center transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Aplicación
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}