
import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SearchRecord {
  id: string;
  job_title: string;
  location: string;
  created_at: string;
  company_id?: string;
  company_name?: string;
}

const SearchesManagement: React.FC = () => {
  const [searches, setSearches] = useState<SearchRecord[]>([]);
  const [filter, setFilter] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchSearches();
  }, []);

  const fetchSearches = async () => {
    try {
      const { data, error } = await supabase
        .from('searches')
        .select(`
          id,
          job_title,
          location,
          created_at,
          company_id,
          companies (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedData = data?.map(search => ({
        ...search,
        company_name: search.companies?.name || null
      })) || [];
      
      setSearches(formattedData);
    } catch (error) {
      console.error('Error fetching searches:', error);
      toast({
        title: "Error",
        description: "Failed to fetch searches",
        variant: "destructive"
      });
    }
  };

  const filteredSearches = searches.filter(search =>
    search.job_title.toLowerCase().includes(filter.toLowerCase()) ||
    search.location.toLowerCase().includes(filter.toLowerCase()) ||
    (search.company_name && search.company_name.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Search History</h3>
      </div>

      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Filter by job title, location, or company..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredSearches.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No searches found</p>
        ) : (
          filteredSearches.map((search) => (
            <Card key={search.id} className="hover:bg-gray-50 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{search.job_title}</h4>
                    <p className="text-sm text-gray-600">{search.location}</p>
                    {search.company_name && (
                      <p className="text-sm text-blue-600">{search.company_name}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(search.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchesManagement;
