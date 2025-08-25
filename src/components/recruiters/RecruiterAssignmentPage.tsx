import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Users, Search, Filter, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { RecruiterAssignment } from '@/types';
import RecruiterAssignmentForm from './RecruiterAssignmentForm';
import { useProfiles } from '@/hooks/useProfiles';
import { useRequisitionData } from '@/hooks/useRequisitionData';

interface RecruiterAssignmentManagerProps {
  assignments: RecruiterAssignment[];
  onAssignmentsChange: (assignments: RecruiterAssignment[]) => void;
}

export default function RecruiterAssignmentPage({
  assignments,
  onAssignmentsChange
}: RecruiterAssignmentManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<RecruiterAssignment | null>(null);
  const [filters, setFilters] = useState({
    recruiter_id: '',
    country_id: '',
    company_id: '',
    department_id: '',
    organizational_level: '',
    is_active: ''
  });

  const { recruiters, loading } = useProfiles()
  // Get unique values for filters
  //const countries = Array.from(new Set(assignments.map(a => a.country_id))).filter(Boolean);
  //const companies = Array.from(new Set(assignments.map(a => a.company_id))).filter(Boolean);
  //const departments = Array.from(new Set(assignments.map(a => a.department_id))).filter(Boolean);

  const {
    countries,
    companies,
    departments,
    positions,
    fetchDepartmentsByCompany
  } = useRequisitionData();

  const organizationalLevels = [
    { value: 'operativo', label: 'Operativo' },
    { value: 'coordinación', label: 'Coordinación' },
    { value: 'jefatura', label: 'Jefatura' },
    { value: 'gerencia', label: 'Gerencial' }
  ];

  useEffect(() => {
    if (filters.company_id) {
      fetchDepartmentsByCompany(filters.company_id);
    }
    setFilters({
      ...filters,
      department_id: ''
    })
  }, [filters.company_id]);

  // Apply filters
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = !filters.recruiter_id || assignment.recruiter_id === filters.recruiter_id;
    const matchesCountry = !filters.country_id || assignment.country_id === filters.country_id;
    const matchesCompany = !filters.company_id || assignment.company_id === filters.company_id;
    const matchesDepartment = !filters.department_id || assignment.department_id === filters.department_id;
    const matchesLevel = !filters.organizational_level || assignment.organizational_level === filters.organizational_level;
    const matchesActive = !filters.is_active ||
      (filters.is_active === 'active' && assignment.is_active) ||
      (filters.is_active === 'inactive' && !assignment.is_active);

    return matchesSearch && matchesCountry && matchesCompany &&
      matchesDepartment && matchesLevel && matchesActive;
  });

  const handleAddAssignment = () => {
    setEditingAssignment(null);
    setShowForm(true);
  };

  const handleEditAssignment = (assignment: RecruiterAssignment) => {
    setEditingAssignment(assignment);
    setShowForm(true);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta asignación?')) {
      onAssignmentsChange(assignments.filter(a => a.id !== assignmentId));
    }
  };

  const handleToggleActive = (assignmentId: string) => {
    onAssignmentsChange(assignments.map(a =>
      a.id === assignmentId ? { ...a, is_active: !a.is_active, updatedAt: new Date() } : a
    ));
  };

  const handleFormSubmit = (assignmentData: Omit<RecruiterAssignment, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingAssignment) {
      onAssignmentsChange(assignments.map(a =>
        a.id === editingAssignment.id
          ? { ...a, ...assignmentData, updatedAt: new Date() }
          : a
      ));
    } else {
      const newAssignment: RecruiterAssignment = {
        ...assignmentData,
        id: Date.now().toString(),
        created_at: new Date(),
        updated_at: new Date()
      };
      onAssignmentsChange([...assignments, newAssignment]);
    }
    setShowForm(false);
    setEditingAssignment(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingAssignment(null);
  };

  const clearFilters = () => {
    setFilters({
      recruiter_id: '',
      country_id: '',
      company_id: '',
      department_id: '',
      organizational_level: '',
      is_active: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  const getOrganizationalLevelLabel = (level: string) => {
    const levelObj = organizationalLevels.find(l => l.value === level);
    return levelObj ? levelObj.label : level;
  };

  const getOrganizationalLevelColor = (level: string) => {
    switch (level) {
      case 'operativo': return 'bg-blue-100 text-blue-800';
      case 'coordinación': return 'bg-yellow-100 text-yellow-800';
      case 'jefatura': return 'bg-orange-100 text-purple-800';
      case 'gerencia': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div>Cargando...</div>
  }
  console.log(companies)
  console.log(departments)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Asignación de Reclutadores</h2>
          <p className="text-gray-600 mt-1">
            Gestione las asignaciones de reclutadores por país, compañía y departamento
          </p>
        </div>
        <button
          onClick={handleAddAssignment}
          className="text-white text-center text-linkedin bg-linkedin hover:bg-linkedin/90  px-4 py-2 rounded-md font-medium inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Asignación
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <h3 className="font-medium text-gray-900">Filtros de Búsqueda</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar reclutador
            </label>
            <div className="relative">
              <select
                required
                value={filters.recruiter_id}
                onChange={(e) => setFilters({ ...filters, recruiter_id: e.target.value })}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              País
            </label>
            <select
              value={filters.country_id}
              onChange={(e) => setFilters({ ...filters, country_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos los países</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compañía
            </label>
            <select
              value={filters.company_id}
              onChange={(e) => setFilters({ ...filters, company_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las compañías</option>
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
              value={filters.department_id}
              onChange={(e) => setFilters({ ...filters, department_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos las áreas</option>
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
              value={filters.organizational_level}
              onChange={(e) => setFilters({ ...filters, organizational_level: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos los niveles</option>
              {organizationalLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filters.is_active}
              onChange={(e) => setFilters({ ...filters, is_active: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredAssignments.length} de {assignments.length} asignaciones
        </div>
      </div>

      {/* Tabla de Asignaciones */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {filteredAssignments.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {assignments.length === 0 ? 'No hay asignaciones configuradas' : 'No se encontraron asignaciones'}
            </h3>
            <p className="text-gray-600 mb-4">
              {assignments.length === 0
                ? 'Comience creando su primera asignación de reclutador'
                : 'Intente ajustar los filtros de búsqueda'
              }
            </p>
            {assignments.length === 0 && (
              <button
                onClick={handleAddAssignment}
                className="text-white text-center text-linkedin bg-linkedin hover:bg-linkedin/90 px-4 py-2 rounded-md font-medium inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Asignación
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Reclutador</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">País</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Compañía</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Área</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Nivel</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Cargo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Ubicación</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{assignment.recruiter.full_name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{assignment.country?.name ?? 'Todos'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{assignment.company?.name ?? 'Todas'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{assignment.department?.name ?? 'Todas'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getOrganizationalLevelColor(assignment.organizational_level)}`}>
                        {getOrganizationalLevelLabel(assignment?.organizational_level ?? 'Todos')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{assignment.position?.name ?? 'Todas'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{assignment?.location ?? 'Todas'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${assignment.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                        {assignment.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleActive(assignment.id)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          {assignment.is_active ? (
                            <ToggleRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEditAssignment(assignment)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAssignment(assignment.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <RecruiterAssignmentForm
          assignment={editingAssignment}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}