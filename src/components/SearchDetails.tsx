
import React, { useState, useEffect } from 'react';
import { Undo2, Users2Icon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CandidateCard from './CandidateCard';
import { Link } from 'react-router-dom';

interface Candidate {
    id: number;
    name: string;
    title: string;
    link: string;
    connections: number;
    description: string;
    education: string;
    experience: string;
    search_id: string;
    image: string;
    score: number;
    technical_score: number;
    strengths: string;
    opportunities: string;
    leadership: string;
    soft_skills: string;
}

interface SearchDetailsProps {
    searchId: string;
}

const SearchDetails: React.FC<SearchDetailsProps> = ({ searchId }) => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        fetchCandidates(searchId);
    }, [searchId]);

    const fetchCandidates = async (searchId: string) => {
        try {
            const { data, error } = await supabase
                .from('candidates')
                .select('id, name, title, link, description, connections, education, experience, image, search_id, score, technical_score, strengths, opportunities, leadership, soft_skills')
                .eq('search_id', searchId)
                .order('score', { ascending: false });

            if (error) throw error;
            setCandidates(data || []);
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
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex justify-between items-center gap-2">
                    <Users2Icon className="h-5 w-5" />
                    Candidatos
                </h3>
                <Link to="/searches" className='flex justify-between items-center gap-2'>
                    <Undo2 className="h-5 w-5" />
                    <span>Volver</span>
                </Link>
            </div>

            <div className="mt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
                    <p className="text-gray-600"><span className="font-medium">{candidates.length}</span> resultados encontrados</p>
                </div>

                <div className="space-y-4">
                    {candidates.map((candidate) => (
                        <CandidateCard key={candidate.id} {...candidate} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchDetails;
