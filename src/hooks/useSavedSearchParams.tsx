
import { useState, useCallback } from 'react';

export interface SearchParams {
  position: string;
  location: string;
  company: {
    name: string;
    industry: string;
    size: string;
  };
  jobDetails: {
    title: string;
    experience: string;
    skills: string[];
  };
  candidateProfile: {
    education: string;
    skills: string[];
    experience: string;
  };
  cultureFit: {
    values: string[];
    traits: string[];
  };
  notes: string;
}

const defaultParams: SearchParams = {
  position: '',
  location: '',
  company: {
    name: '',
    industry: '',
    size: ''
  },
  jobDetails: {
    title: '',
    experience: '',
    skills: []
  },
  candidateProfile: {
    education: '',
    skills: [],
    experience: ''
  },
  cultureFit: {
    values: [],
    traits: []
  },
  notes: ''
};

export const useSavedSearchParams = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultParams);
  const [isSearching, setIsSearching] = useState(false);

  const updateParams = useCallback((section: keyof SearchParams, data: any) => {
    setSearchParams(prev => ({
      ...prev,
      [section]: typeof data === 'object' ? { ...prev[section], ...data } : data
    }));
  }, []);

  const startSearch = useCallback(() => {
    setIsSearching(true);
    // In a real app, this would trigger an API call
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  }, []);

  return {
    searchParams,
    updateParams,
    isSearching,
    startSearch
  };
};
