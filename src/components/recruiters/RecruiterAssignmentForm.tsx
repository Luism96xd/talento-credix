import React, { useState, useEffect } from 'react';
import { Loader2, Send, X } from 'lucide-react';
import { RecruiterAssignment } from '@/types';
import { useRequisitionData } from '@/hooks/useRequisitionData';
import { useProfiles } from '@/hooks/useProfiles';
import { countryStates } from '@/lib/utils';
import { toast, useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RecruiterAssignmentFormProps {
  assignment: RecruiterAssignment | null;
  onSubmit: (assignment: Omit<RecruiterAssignment, 'id' | 'created_at' | 'updated_at'>) => void;
  onClose: () => void;
}


const organizationalLevels = [
  { value: 'operativo', label: 'Operativo' },
  { value: 'coordinacion', label: 'Coordinación' },
  { value: 'jefatura', label: 'Jefatura' },
  { value: 'gerencia', label: 'Gerencia' }
];

export default function RecruiterAssignmentForm({
  assignment,
  onSubmit,
  onClose
}: RecruiterAssignmentFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    recruiter_id: '',
    country_id: '',
    company_id: null,
    department_id: null,
    position_id: null,
    location: '',
    organizational_level: 'operativo' as 'operativo' | 'coordinación' | 'jefatura' | 'gerencia',
    is_active: true,
  });

  const {
    countries,
    companies,
    departments,
    positions,
    fetchCompaniesByCountry,
    fetchDepartmentsByCompany,
    fetchPositionsByDepartment,
    fetchLevelsByPosition,
  } = useRequisitionData();

  const { recruiters } = useProfiles()
  const { toast } = useToast()

  useEffect(() => {
    if (assignment) {
      setFormData({
        recruiter_id: assignment.recruiter_id,
        country_id: assignment.country_id,
        company_id: assignment.company_id,
        department_id: assignment.department_id,
        position_id: assignment.position_id,
        location: assignment.location,
        organizational_level: assignment.organizational_level,
        is_active: assignment.is_active
      });
    }
  }, [assignment]);


  // Handle cascading selects
  useEffect(() => {
    if (formData.country_id) {
      fetchCompaniesByCountry(formData.country_id);
      setFormData({
        ...formData,
        company_id: null,
        department_id: null,
        position_id: null,
        location: null
      })
    }
  }, [formData.country_id]);

  useEffect(() => {
    if (formData.company_id) {
      fetchDepartmentsByCompany(formData.company_id);
      setFormData({
        ...formData,
        department_id: null,
        position_id: null,
        location: null
      })
    }
  }, [formData.company_id]);

  useEffect(() => {
    if (formData.department_id) {
      fetchPositionsByDepartment(formData.department_id);
      setFormData({
        ...formData,
        position_id: null,
        location: null
      })
    }
  }, [formData.department_id]);

  useEffect(() => {
    if (formData.position_id) {
      fetchLevelsByPosition(formData.position_id);
      setFormData({
        ...formData,
        location: null
      })
    }
  }, [formData.position_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.recruiter_id) {
      toast({
        title: 'Error',
        description: 'Por favor, seleccione un reclutador'
      });
      return;
    }

    if (!formData.country_id) {
      toast({
        title: 'Error',
        description: 'Por favor, complete todos los campos de asignación'
      });
      return;
    }

    try {
      setLoading(true)
      const payload = {
        recruiter_id: formData.recruiter_id,
        country_id: formData.country_id,
        company_id: formData.company_id,
        department_id: formData.department_id,
        position_id: formData.position_id,
        location: formData.location,
        organizational_level: formData.organizational_level,
        is_active: formData.is_active,
      }
      const { error } = await supabase.from('recruiter_assignments').insert(payload);
      if (error) throw error
      onSubmit(payload)
    } catch (error) {
      console.error('Error al crear la asignación', error)
    } finally{
      setLoading(false)
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
                    value={formData.country_id}
                    onChange={(e) => setFormData({ ...formData, country_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione un país</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
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
                    value={formData.company_id}
                    onChange={(e) => setFormData({ ...formData, company_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione una compañía</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Área
                  </label>
                  <select
                    value={formData.department_id}
                    onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione un área</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nivel Organizacional
                  </label>
                  <select
                    value={formData.organizational_level}
                    onChange={(e) => setFormData({
                      ...formData,
                      organizational_level: e.target.value as 'operativo' | 'coordinación' | 'jefatura' | 'gerencia'
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="todos">Seleccione un nivel</option>
                    {organizationalLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo
                  </label>
                  <select
                    value={formData.position_id}
                    onChange={(e) => setFormData({
                      ...formData,
                      position_id: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione un cargo</option>
                    {positions.map((position) => (
                      <option key={position.id} value={position.id}>
                        {position.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: e.target.value as string
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione una ubicación</option>
                    {countryStates[countries.find(country => country.id === formData.country_id)?.name]?.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Información del Reclutador */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Información del Reclutador</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reclutador *
                  </label>
                  <select
                    required
                    value={formData.recruiter_id}
                    onChange={(e) => setFormData({ ...formData, recruiter_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione un reclutador</option>
                    {recruiters.map((recruiter) => (
                      <option key={recruiter.id} value={recruiter.id}>
                        {recruiter.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Estado */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
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
              disabled={loading}
              type="submit"
              className="text-white text-center text-linkedin bg-linkedin hover:bg-linkedin/90  px-4 py-2 rounded-md font-medium inline-flex items-center"
              >
              {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {assignment ? 'Actualizando...' : 'Creando...'}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {assignment ? 'Actualizar' : 'Crear'} Asignación
                  </>
                )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}