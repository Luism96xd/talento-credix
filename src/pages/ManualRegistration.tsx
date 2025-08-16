
import ManualCandidateForm from '@/components/candidates/ManualCandidateForm';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Process } from '@/types';
import { useEffect, useState } from 'react';

export const ManualRegistration = () => {
    const [processes, setProcesses] = useState<Process[]>([])
    const { toast } = useToast()

    useEffect(() => {
        fetchProcesses();
    }, []);

    const fetchProcesses = async () => {
        try {
            const { data, error } = await supabase
                .from('processes')
                .select('*')
                .eq('is_active', true)
                .order('name', { ascending: true });

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Candidatos</h1>
                    <ManualCandidateForm processes={processes} onCandidateSubmit={console.log} />
                </div>
            </div>
        </div>
    );
};