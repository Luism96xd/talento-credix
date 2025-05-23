
import { useState } from 'react';

interface Company {
  id: string;
  name: string;
  description: string;
  mission: string;
  vision: string;
}

export interface SearchParams {
  position: string;
  location: string;
  company: Company | null;
  jobDetails: {
    requirements: string;
    responsibilities: string;
    benefits: string;
    fileUrl: string;
  };
  candidateProfile: {
    experience: string;
    skills: string;
    education: string;
  };
  cultureFit: {
    values: string;
    workStyle: string;
    teamFit: string;
  };
  notes: string;
}

const initialSearchParams: SearchParams = {
  position: '',
  location: '',
  company: null,
  jobDetails: {
    requirements: '',
    responsibilities: '',
    benefits: '',
    fileUrl: ''
  },
  candidateProfile: {
    experience: '',
    skills: '',
    education: ''
  },
  cultureFit: {
    values: '',
    workStyle: '',
    teamFit: ''
  },
  notes: ''
};

export const useSavedSearchParams = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);
  const [isSearching, setIsSearching] = useState(false);

  const updateParams = (section: keyof SearchParams, data: any) => {
    setSearchParams(prev => ({
      ...prev,
      [section]: typeof data === 'object' && data !== null && section !== 'company' 
        ? { ...prev[section] as object, ...data } 
        : data
    }));
  };

  const startSearch = () => {
    setIsSearching(true);
    // Reset after some time (this would be replaced with actual API call)
    setTimeout(() => setIsSearching(false), 3000);
  };

  return {
    searchParams,
    updateParams,
    isSearching,
    startSearch
  };
};
