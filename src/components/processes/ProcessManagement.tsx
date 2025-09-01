import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Briefcase, Loader2, ArrowRight } from 'lucide-react';
import { Phase, Process, Country, Requisition } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProcessForm from './ProcessForm';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Link } from 'react-router-dom';

export default function ProcessManagement() {
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProcess, setEditingProcess] = useState<Requisition | null>(null);
  const [phases, setPhases] = useState<Phase[]>([])
  const [countries, setCountries] = useState<Country[]>([]);
  const [companies, setCompanies] = useState<Country[]>([]);

  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-primary';
      case 'paused':
        return 'bg-yellow-500';
      case 'closed':
        return 'bg-seconday';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Abierta';
      case 'paused':
        return 'En pausa';
      case 'closed':
        return 'Cerrada';
      default:
        return 'Desconocido';
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          fetchProcesses(),
          fetchPhases(),
          fetchCompanies(),
          fetchCountries()
        ]);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos iniciales",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);


  const fetchProcesses = async () => {
    try {
      const { data, error } = await supabase
        .from('requisitions')
        .select('*, positions(name), department:departments(name)')
        .eq('status', 'open')

        .order('created_at', { ascending: false });
      if (error) throw error;
      setRequisitions(data || []);
    } catch (error) {
      console.error('Error fetching requisitions:', error);
      toast({
        title: "Error",
        description: 'Error al cargar las vacantes',
        variant: "destructive"
      });
    }
  };

  const fetchCountries = async () => {
    try {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setCountries(data || [])
    } catch (error) {
      console.error('Error fetching countries:', error)
    }
  }

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setCompanies(data || [])
    } catch (error) {
      console.error('Error fetching countries:', error)
    }
  }

  const fetchPhases = async () => {
    try {
      const { data, error } = await supabase
        .from('phases')
        .select('*')
        .order('order', {ascending: true})

      if (error) throw error;
      setPhases(data);
    } catch (error) {
      console.error('Error fetching phases:', error);
      toast({
        title: "Error",
        description: "Failed to fetch phases",
        variant: "destructive"
      });
    }
  };

  const handleAddProcess = () => {
    setEditingProcess(null);
    setShowForm(true);
  };

  const handleEditProcess = (requisition: Requisition) => {
    setEditingProcess(requisition);
    setShowForm(true);
  };

  const handleDeleteProcess = async (requisitionId: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este proceso?')) return;

    try {
      const { error } = await supabase
        .from('requisitions')
        .delete()
        .eq('id', requisitionId);

      if (error) throw error;

      await fetchProcesses();
    } catch (error) {
      console.error('Error deleting requisition:', error);
      alert('Error al eliminar el proceso');
    }
  };

  const handleToggleActive = async (requisitionId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('requisitions')
        .update({ is_active: !currentStatus })
        .eq('id', requisitionId);

      if (error) throw error;

      await fetchProcesses();
    } catch (error) {
      console.error('Error toggling requisition status:', error);
      alert('Error al cambiar el estado del proceso');
    }
  };

  const handleFormSubmit = async (requisitionData: Omit<Process, 'id' | 'created_at'>) => {
    try {
      if (editingProcess) {
        const { error } = await supabase
          .from('requisitions')
          .update(requisitionData)
          .eq('id', editingProcess.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('requisitions')
          .insert([requisitionData]);

        if (error) throw error;
      }

      await fetchProcesses();
      setShowForm(false);
      setEditingProcess(null);
    } catch (error) {
      console.error('Error saving requisition:', error);
      alert('Error al guardar el proceso');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProcess(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Cargando vacantes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vacates abiertas</h2>
          <p className="text-gray-600 mt-1">Visualice las vacantes abiertas</p>
        </div>
        <Button
          onClick={handleAddProcess}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuevo proceso
        </Button>
      </div>

      <div>
        {requisitions.length === 0 ? (
          <div className="p-8 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay vacantes abiertas</h3>
            <p className="text-gray-600 mb-4">Comience creando su primer proceso de selección</p>
            <button
              onClick={handleAddProcess}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Proceso
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 flex flex-col gap-4">
            {requisitions && requisitions.map((requisition) => (
              <Card key={requisition.id} className="border border-border rounded-lg p-2 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold gap-2 text-slate-900 items-center flex">
                        <Briefcase className="h-4 w-4 text-slate-500" />
                        {requisition.positions.name}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProcess(requisition)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProcess(requisition.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Badge
                        className={`${getStatusColor(requisition.status)} text-white`}
                        variant="secondary"
                      >
                        {getStatusText(requisition.status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground mb-2">
                        Fases del proceso ({phases.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {phases.map((phase) => {
                          return phase ? (
                            <Badge key={phase.id} variant="outline" className="flex items-center gap-1">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: phase.color }}
                              />
                              {phase.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div>
                      <Link
                        to={`/candidates/${requisition.id}`}
                        className="flex flex-row gap-4 bg-linkedin rounded-lg text-white px-4 py-2 items-center w-full"
                      >
                        <span>Ver Candidatos</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>

              </Card>
            ))}
          </div>
        )}
      </div>
      {showForm && (
        <ProcessForm
          phases={phases}
          countries={countries}
          companies={companies}
          requisition={editingProcess}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}