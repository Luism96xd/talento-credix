import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Briefcase, Loader2 } from 'lucide-react';
import { Phase, Process, Country } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProcessForm from './ProcessForm';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export default function ProcessManagement() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProcess, setEditingProcess] = useState<Process | null>(null);
  const [phases, setPhases] = useState<Phase[]>([])
  const [countries, setCountries] = useState<Country[]>([]);
  const [companies, setCompanies] = useState<Country[]>([]);

  const { toast } = useToast()

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
        .select('*, positions(name)')
        .eq('status', 'open')

        .order('created_at', { ascending: false });
      if (error) throw error;
      setProcesses(data || []);
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

  const handleEditProcess = (process: Process) => {
    setEditingProcess(process);
    setShowForm(true);
  };

  const handleDeleteProcess = async (processId: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este proceso?')) return;

    try {
      const { error } = await supabase
        .from('processes')
        .delete()
        .eq('id', processId);

      if (error) throw error;

      await fetchProcesses();
    } catch (error) {
      console.error('Error deleting process:', error);
      alert('Error al eliminar el proceso');
    }
  };

  const handleToggleActive = async (processId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('processes')
        .update({ is_active: !currentStatus })
        .eq('id', processId);

      if (error) throw error;

      await fetchProcesses();
    } catch (error) {
      console.error('Error toggling process status:', error);
      alert('Error al cambiar el estado del proceso');
    }
  };

  const handleFormSubmit = async (processData: Omit<Process, 'id' | 'created_at'>) => {
    try {
      if (editingProcess) {
        const { error } = await supabase
          .from('processes')
          .update(processData)
          .eq('id', editingProcess.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('processes')
          .insert([processData]);

        if (error) throw error;
      }

      await fetchProcesses();
      setShowForm(false);
      setEditingProcess(null);
    } catch (error) {
      console.error('Error saving process:', error);
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
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
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
        {processes.length === 0 ? (
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
            {processes && processes.map((process) => (
              <Card key={process.id} className="border border-border rounded-lg p-6 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="w-5 h-5 text-primary-accent" />
                      <h4 className="font-semibold text-foreground">{process.positions.name}</h4>
                      <Badge variant={process.status === 'open' ? "default" : "secondary"}>
                        {process.status === 'open' ? 'Abierto' : 'Cerrado'}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{process.description}</p>

                    <div>
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
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(process.id, process.is_active)}
                    >
                      {process.is_active ? 'Desactivar' : 'Activar'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProcess(process)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProcess(process.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
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
          process={editingProcess}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}