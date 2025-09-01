import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, TrendingUp, TrendingDown, Users, Award, Calendar, Target } from 'lucide-react';
import { useSupabaseQuery } from '../../hooks/useSupabase';
import { Candidate, RecruiterMetrics } from '../../types';

export default function RecruiterDashboard() {
  const [selectedRecruiter, setSelectedRecruiter] = useState<string>('');
  const [metrics, setMetrics] = useState<RecruiterMetrics[]>([]);

  const { data: candidates, loading: candidatesLoading } = useSupabaseQuery<Candidate>('candidates', '*');
  const { data: recruiterAssignments, loading: recruitersLoading } = useSupabaseQuery('recruiter_assignments', '*');

  // Get unique recruiters from candidates
  const recruiters = Array.from(new Set(
    candidates
      .filter(c => c.recruiter)
      .map(c => c.recruiter!)
  ));

  useEffect(() => {
    if (candidates.length > 0) {
      calculateMetrics();
    }
  }, [candidates]);

  const calculateMetrics = () => {
    const recruiterMetrics: RecruiterMetrics[] = [];

    recruiters.forEach(recruiterName => {
      const recruiterCandidates = candidates.filter(c => c.recruiter === recruiterName);
      const hiredCandidates = recruiterCandidates.filter(c => c.status === 'hired');
      
      // Calculate closing times for hired candidates
      const closingTimes = hiredCandidates.map(candidate => {
        const startDate = new Date(candidate.created_at);
        const endDate = new Date(candidate.updated_at);
        return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      });

      const averageClosingTime = closingTimes.length > 0 
        ? Math.round(closingTimes.reduce((sum, time) => sum + time, 0) / closingTimes.length)
        : 0;

      const minClosingTime = closingTimes.length > 0 ? Math.min(...closingTimes) : 0;
      const maxClosingTime = closingTimes.length > 0 ? Math.max(...closingTimes) : 0;

      recruiterMetrics.push({
        recruiter_id: recruiterName,
        recruiterName,
        totalCandidates: recruiterCandidates.length,
        hiredCandidates: hiredCandidates.length,
        averageClosingTime,
        minClosingTime,
        maxClosingTime,
        activeProcesses: recruiterCandidates.filter(c => c.status === 'active').length
      });
    });

    setMetrics(recruiterMetrics);
  };

  const selectedMetrics = selectedRecruiter 
    ? metrics.find(m => m.recruiter_id === selectedRecruiter)
    : null;

  const overallMetrics = {
    totalCandidates: metrics.reduce((sum, m) => sum + m.total_candidates, 0),
    totalHired: metrics.reduce((sum, m) => sum + m.hired_candidates, 0),
    averageClosingTime: metrics.length > 0 
      ? Math.round(metrics.reduce((sum, m) => sum + m.average_closing_time, 0) / metrics.length)
      : 0,
    totalActiveProcesses: metrics.reduce((sum, m) => sum + m.active_processes, 0)
  };

  if (candidatesLoading || recruitersLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard de Reclutadores</h2>
          <p className="text-gray-600 mt-1">Métricas y estadísticas de rendimiento</p>
        </div>
        
        <div className="w-64">
          <select
            value={selectedRecruiter}
            onChange={(e) => setSelectedRecruiter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Ver métricas generales</option>
            {recruiters.map((recruiter) => (
              <option key={recruiter} value={recruiter}>
                {recruiter}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Candidatos</p>
              <p className="text-2xl font-bold text-gray-900">
                {selectedMetrics ? selectedMetrics.total_candidates : overallMetrics.totalCandidates}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Candidatos Contratados</p>
              <p className="text-2xl font-bold text-green-600">
                {selectedMetrics ? selectedMetrics.hired_candidates : overallMetrics.totalHired}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tiempo Promedio de Cierre</p>
              <p className="text-2xl font-bold text-orange-600">
                {selectedMetrics ? selectedMetrics.average_closing_time : overallMetrics.averageClosingTime} días
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Procesos Activos</p>
              <p className="text-2xl font-bold text-purple-600">
                {selectedMetrics ? selectedMetrics.active_processes : overallMetrics.totalActiveProcesses}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Métricas Detalladas */}
      {selectedMetrics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-green-600" />
              Tiempo Mínimo de Cierre
            </h3>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 mb-2">
                {selectedMetrics.min_closing_time}
              </p>
              <p className="text-gray-600">días</p>
              <p className="text-sm text-gray-500 mt-2">
                Mejor tiempo registrado este año
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-red-600" />
              Tiempo Máximo de Cierre
            </h3>
            <div className="text-center">
              <p className="text-4xl font-bold text-red-600 mb-2">
                {selectedMetrics.max_closing_time}
              </p>
              <p className="text-gray-600">días</p>
              <p className="text-sm text-gray-500 mt-2">
                Tiempo más largo registrado este año
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de Reclutadores */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Ranking de Reclutadores
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Reclutador</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Total Candidatos</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Contratados</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Tasa de Éxito</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Tiempo Promedio</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Tiempo Mín.</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Tiempo Máx.</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Activos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {metrics
                .sort((a, b) => b.hired_candidates - a.hired_candidates)
                .map((metric, index) => {
                  const successRate = metric.total_candidates > 0 
                    ? Math.round((metric.hired_candidates / metric.total_candidates) * 100)
                    : 0;
                  
                  return (
                    <tr key={metric.recruiter_id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900">{metric.recruiter_name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900">{metric.total_candidates}</td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-green-600">{metric.hired_candidates}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          successRate >= 50 ? 'bg-green-100 text-green-800' :
                          successRate >= 25 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {successRate}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-900">{metric.average_closing_time} días</td>
                      <td className="py-4 px-6">
                        <span className="text-green-600 font-medium">{metric.min_closing_time} días</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-red-600 font-medium">{metric.max_closing_time} días</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {metric.active_processes}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}