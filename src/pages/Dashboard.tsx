
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStore } from '../store/useStore';
import KanbanBoard from '../components/KanbanBoard';
import ListView from '../components/ListView';
import CandidateModal from '../components/CandidateModal';
import { LayoutGrid, List, Users, FileText, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { candidates, phases, processes } = useStore();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const totalCandidates = candidates.length;
  const activeCandidates = candidates.filter(c => c.currentPhaseId !== phases[phases.length - 1]?.id).length;
  const completedCandidates = candidates.filter(c => c.currentPhaseId === phases[phases.length - 1]?.id).length;
  const activeProcesses = processes.filter(p => p.isActive).length;

  const stats = [
    {
      title: 'Total Candidatos',
      value: totalCandidates,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'En Proceso',
      value: activeCandidates,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Completados',
      value: completedCandidates,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Procesos Activos',
      value: activeProcesses,
      icon: FileText,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Panel de control del sistema de selección</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-white rounded-lg shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Candidatos</h2>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            onClick={() => setViewMode('kanban')}
            className="flex items-center"
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Kanban
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
            className="flex items-center"
          >
            <List className="h-4 w-4 mr-2" />
            Lista
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'kanban' ? (
        <KanbanBoard onCandidateClick={setSelectedCandidate} />
      ) : (
        <ListView onCandidateClick={setSelectedCandidate} />
      )}

      {/* Candidate Modal */}
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
