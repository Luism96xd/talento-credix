import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { RecruiterAssignment } from '@/types';

interface RecruiterAssignmentFormProps {
  assignment: RecruiterAssignment | null;
  onSubmit: (assignment: Omit<RecruiterAssignment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const countries = [
  'México', 'Estados Unidos', 'Canadá', 'Colombia', 'Argentina', 'Chile', 'Perú', 'Brasil'
];

const companies = [
  'Mayoreo Central', 'Mayoreo Norte', 'Mayoreo Sur', 'Mayoreo Internacional', 
  'Mayoreo Logística', 'Mayoreo Tecnología'
];

const departments = [
  'Ventas', 'Marketing', 'Recursos Humanos', 'Finanzas', 'Operaciones', 
  'Tecnología', 'Logística', 'Compras', 'Atención al Cliente', 'Administración'
];

const organizationalLevels = [
  { value: 'operativo', label: 'Operativo' },
  { value: 'coordinacion', label: 'Coordinación' },
  { value: 'gerencial', label: 'Gerencial' }
];

const commonSpecializations = [
  'Ventas', 'Marketing Digital', 'Recursos Humanos', 'Finanzas', 'Contabilidad',
  'Tecnología', 'Desarrollo de Software', 'Logística', 'Operaciones', 'Atención al Cliente',
  'Administración', 'Compras', 'Calidad', 'Seguridad', 'Legal'
];

export default function RecruiterAssignmentForm({ 
  assignment, 
  onSubmit, 
  onClose 
}: RecruiterAssignmentFormProps) {
  const [formData, setFormData] = useState({
    recruiterId: '',
    recruiterName: '',
    recruiterEmail: '',
    country: '',
    company: '',
    department: '',
    organizationalLevel: 'operativo' as 'operativo' | 'coordinacion' | 'gerencial',
    isActive: true,
    maxCandidates: '',
    specializations: [] as string[]
  });

  const [customSpecialization, setCustomSpecialization] = useState('');

  useEffect(() => {
    if (assignment) {
      setFormData({
        recruiterId: assignment.recruiterId,
        recruiterName: assignment.recruiterName,
        recruiterEmail: assignment.recruiterEmail,
        country: assignment.country,
        company: assignment.company,
        department: assignment.department,
        organizationalLevel: assignment.organizationalLevel,
        isActive: assignment.isActive,
        maxCandidates: assignment.maxCandidates?.toString() || '',
        specializations: [...assignment.specializations]
      });
    }
  }, [assignment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.recruiterName.trim() || !formData.recruiterEmail.trim()) {
      alert('Por favor, complete los campos obligatorios del reclutador.');
      return;
    }

    if (!formData.country || !formData.company || !formData.department) {
      alert('Por favor, complete todos los campos de asignación.');
      return;
    }

    onSubmit({
      recruiterId: formData.recruiterId || Date.now().toString(),
      recruiterName: formData.recruiterName.trim(),
      recruiterEmail: formData.recruiterEmail.trim(),
      country: formData.country,
      company: formData.company,
      department: formData.department,
      organizationalLevel: formData.organizationalLevel,
      isActive: formData.isActive,
      maxCandidates: formData.maxCandidates ? parseInt(formData.maxCandidates) : undefined,
      specializations: formData.specializations
    });
  };

  const addSpecialization = (specialization: string) => {
    if (specialization && !formData.specializations.includes(specialization)) {
      setFormData({
        ...formData,
        specializations: [...formData.specializations, specialization]
      });
    }
  };

  const removeSpecialization = (specialization: string) => {
    setFormData({
      ...formData,
      specializations: formData.specializations.filter(s => s !== specialization)
    });
  };

  const addCustomSpecialization = () => {
    if (customSpecialization.trim()) {
      addSpecialization(customSpecialization.trim());
      setCustomSpecialization('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {assignment ? 'Editar Asignación' : 'Nueva Asignación de Reclutador'}
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
            {/* Información del Reclutador */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Información del Reclutador</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Reclutador *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recruiterName}
                    onChange={(e) => setFormData({ ...formData, recruiterName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nombre completo del reclutador"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email del Reclutador *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.recruiterEmail}
                    onChange={(e) => setFormData({ ...formData, recruiterEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@mayoreo.com"
                  />
                </div>
              </div>
            </div>

            {/* Criterios de Asignación */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Criterios de Asignación</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    País *
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione un país</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compañía *
                  </label>
                  <select
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione una compañía</option>
                    {companies.map((company) => (
                      <option key={company} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento *
                  </label>
                  <select
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione un departamento</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nivel Organizacional *
                  </label>
                  <select
                    required
                    value={formData.organizationalLevel}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      organizationalLevel: e.target.value as 'operativo' | 'coordinacion' | 'gerencial'
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {organizationalLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Máximo de Candidatos (opcional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxCandidates}
                    onChange={(e) => setFormData({ ...formData, maxCandidates: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: 50"
                  />
                </div>
              </div>
            </div>

            {/* Especializaciones */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Especializaciones</h4>
              
              {/* Especializaciones seleccionadas */}
              {formData.specializations.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Especializaciones asignadas:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {spec}
                        <button
                          type="button"
                          onClick={() => removeSpecialization(spec)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Especializaciones comunes */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Especializaciones disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {commonSpecializations
                    .filter(spec => !formData.specializations.includes(spec))
                    .map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => addSpecialization(spec)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                      >
                        + {spec}
                      </button>
                    ))}
                </div>
              </div>

              {/* Especialización personalizada */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Agregar especialización personalizada:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSpecialization}
                    onChange={(e) => setCustomSpecialization(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSpecialization())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Escriba una especialización personalizada"
                  />
                  <button
                    type="button"
                    onClick={addCustomSpecialization}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Estado */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Asignación activa (el reclutador recibirá nuevas vacantes)
              </label>
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
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              {assignment ? 'Actualizar' : 'Crear'} Asignación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}