import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Process, Phase, Country, Company, Requisition } from '@/types';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useRequisitionData } from '@/hooks/useRequisitionData';

interface ProcessFormSupabaseProps {
  requisition: Requisition | null;
  phases: Phase[];
  countries?: Country[],
  companies?: Company[],
  onSubmit: (requisition: Omit<Process, 'id' | 'created_at'>) => void;
  onClose: () => void;
}

export default function ProcessForm({ requisition, phases, onSubmit, onClose }: ProcessFormSupabaseProps) {
  const [selectedPhases, setSelectedPhases] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    company_id: '',
    country_id: '',
    department_id: '',
    position_id: '',
    status: 'open',
  });

  const {
    companies,
    countries,
    departments,
    positions,
    fetchCompaniesByCountry,
    fetchDepartmentsByCompany,
    fetchPositionsByDepartment,
  } = useRequisitionData();

  useEffect(() => {
    if (requisition) {
      setFormData({
        company_id: requisition.company_id,
        country_id: requisition.country_id,
        department_id: requisition.department_id,
        position_id: requisition.positions_id,
        status: requisition.status,
      });
    }
  }, [requisition]);

  //Handle cascading selects
  useEffect(() => {
    if (formData.country_id) {
      fetchCompaniesByCountry(formData.country_id);
      setFormData({
        ...formData,
        company_id: ''
      })
    }
  }, [formData.country_id]);

  useEffect(() => {
    if (formData.company_id) {
      fetchDepartmentsByCompany(formData.company_id);
      setFormData({
        ...formData,
        department_id: ''
      })
    }
  }, [formData.company_id]);

  useEffect(() => {
    if (formData.department_id) {
      fetchPositionsByDepartment(formData.department_id);
      setFormData({
        ...formData,
        position_id: ''
      })
    }
  }, [formData.department_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //onSubmit(formData);
  };

  const handlePhaseToggle = (phaseId: string) => {
    setSelectedPhases(prev =>
      prev.includes(phaseId)
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {requisition ? 'Editar Vacante' : 'Nueva Vacante'}
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
                  {countries && countries.map((country) => (
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
                  {companies && companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área *
                </label>
                <select
                  required
                  value={formData.department_id}
                  onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccione un área</option>
                  {departments && departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posición *
                </label>
                <select
                  required
                  value={formData.position_id}
                  onChange={(e) => setFormData({ ...formData, position_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccione una posición</option>
                  {positions && positions.map((position) => (
                    <option key={position.id} value={position.id}>
                      {position.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="open">Abierta</option>
                  <option value="closed">Cerrada</option>
                  <option value="paused">Suspendida</option>

                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Fases del proceso</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {phases.map((phase) => (
                <div key={phase.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50">
                  <Checkbox
                    id={phase.id}
                    checked={selectedPhases.includes(phase.id)}
                    onCheckedChange={() => handlePhaseToggle(phase.id)}
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: phase.color }}
                    />
                    <Label htmlFor={phase.id} className="cursor-pointer">
                      {phase.name}
                    </Label>
                  </div>
                </div>
              ))}
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
              {requisition ? 'Actualizar' : 'Crear'} Proceso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}