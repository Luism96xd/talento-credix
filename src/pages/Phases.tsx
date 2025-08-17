import PhasesManagement from "@/components/phases/PhasesManagement";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phase } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";


export const Phases = () => {
  const [phases, setPhases] = useState<Phase[]>([])
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    fetchPhases();
  }, []);

  const fetchPhases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('phases')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setPhases(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch candidates",
        variant: "destructive"
      });
    } finally{
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Cargando fases...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PhasesManagement
            phases={phases}
            onPhasesChange={fetchPhases}
          />
        </div>
      </div>
    </div>
  );
};