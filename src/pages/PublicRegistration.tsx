
import PublicApplicationForm from '@/components/candidates/PublicApplicationForm';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Candidate, Process } from '@/types';
import { useEffect, useState } from 'react';

export const PublicRegistration = () => {
    const [processes, setProcesses] = useState<Process[]>([])
    const { toast } = useToast()

    useEffect(() => {
        fetchProcesses();
    }, []);

    const fetchProcesses = async () => {
        try {
            const { data, error } = await supabase
                .from('requisitions')
                .select('*, positions(name), companies(name)')
                .eq('status', 'open')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProcesses(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
            toast({
                title: "Error",
                description: "Failed to fetch candidates",
                variant: "destructive"
            });
        }
    };

    const registerCandidate = async (candidate: Candidate) => {
        try {
            const {data, error} = await supabase
            .from('candidates')
            .insert(candidate)
            .select()
    
            if(error) throw error
            console.log(data)

            toast({
                title: "Éxito",
                description: "Tu solicitud ha sido enviada con éxito",
                variant: "default"
            });

        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Error al registrar el candidato",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">¡Únete al equipo!</h1>
                    <PublicApplicationForm processes={processes} onCandidateSubmit={registerCandidate} />
                </div>
            </div>
        </div>
    );
};