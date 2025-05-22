
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import Sidebar from '@/components/Sidebar';
import CandidateCard from '@/components/CandidateCard';
import { Progress } from '@/components/ui/progress';
import { useSavedSearchParams } from '@/hooks/useSavedSearchParams';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for the candidate results
const MOCK_CANDIDATES = [
  {
    id: '1',
    name: 'Alex Johnson',
    position: 'Senior Frontend Developer',
    company: 'Tech Innovators',
    location: 'San Francisco, CA',
    avatar: '',
    score: 92,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    match: {
      experience: 95,
      skills: 90,
      education: 85,
      culture: 95
    }
  },
  {
    id: '2',
    name: 'Jamie Smith',
    position: 'Frontend Engineer',
    company: 'DevCorp',
    location: 'Austin, TX',
    avatar: '',
    score: 85,
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'Redux'],
    match: {
      experience: 80,
      skills: 90,
      education: 90,
      culture: 85
    }
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    position: 'UI Developer',
    company: 'Creative Solutions',
    location: 'New York, NY',
    avatar: '',
    score: 78,
    skills: ['JavaScript', 'React', 'CSS', 'UI Design'],
    match: {
      experience: 75,
      skills: 80,
      education: 80,
      culture: 75
    }
  },
  {
    id: '4',
    name: 'Morgan Davis',
    position: 'Frontend Developer',
    company: 'Innovation Labs',
    location: 'Remote',
    avatar: '',
    score: 73,
    skills: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
    match: {
      experience: 70,
      skills: 75,
      education: 85,
      culture: 65
    }
  },
  {
    id: '5',
    name: 'Jordan Miller',
    position: 'React Developer',
    company: 'WebTech Inc.',
    location: 'Chicago, IL',
    avatar: '',
    score: 68,
    skills: ['React', 'Redux', 'JavaScript', 'Bootstrap'],
    match: {
      experience: 65,
      skills: 70,
      education: 75,
      culture: 60
    }
  }
];

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [candidates, setCandidates] = useState<typeof MOCK_CANDIDATES>([]);
  const [searchProgress, setSearchProgress] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  
  const { 
    searchParams, 
    updateParams, 
    isSearching, 
    startSearch 
  } = useSavedSearchParams();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleSearch = (position: string, location: string) => {
    updateParams('position', position);
    updateParams('location', location);
    setShowLoadingScreen(true);
    setSearchProgress(0);
    setSearchInitiated(false);
    
    // Simulate search progress
    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);
    
    // Simulate API call delay
    setTimeout(() => {
      clearInterval(progressInterval);
      setSearchProgress(100);
      
      setTimeout(() => {
        setCandidates(MOCK_CANDIDATES);
        setSearchInitiated(true);
        setShowLoadingScreen(false);
      }, 500);
    }, 2500);
  };
  
  // Main content padding to account for sidebar when open
  const mainContentClasses = cn(
    "min-h-screen flex flex-col transition-all duration-300",
    sidebarOpen ? "md:pl-[340px]" : ""
  );
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-slate-100 min-h-screen">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        searchParams={searchParams}
        updateParams={updateParams}
      />
      
      <div className={mainContentClasses}>
        <header className="py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Find Top LinkedIn Talent</h1>
            <p className="text-gray-600 mb-6">Search for candidates that match your specific requirements</p>
            
            <SearchBar 
              onSearch={handleSearch} 
              placeholderPosition="Frontend Developer" 
              placeholderLocation="San Francisco, CA"
            />
          </div>
        </header>
        
        <main className="flex-1 px-4 md:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {showLoadingScreen && (
              <div className="mt-12 text-center animate-fade-in">
                <div className="mb-4 flex justify-center">
                  <Loader className="h-12 w-12 text-linkedin animate-spin" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Searching for the best matches...</h3>
                <p className="text-gray-500 mb-6">We're analyzing profiles based on your search criteria</p>
                
                <div className="max-w-md mx-auto">
                  <Progress value={searchProgress} className="h-2" />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Analyzing profiles</span>
                    <span>{Math.round(searchProgress)}%</span>
                  </div>
                </div>
              </div>
            )}
            
            {searchInitiated && !showLoadingScreen && (
              <div className="mt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
                  <p className="text-gray-600">Found <span className="font-medium">{candidates.length}</span> matching candidates</p>
                </div>
                
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))}
                </div>
              </div>
            )}
            
            {!searchInitiated && !showLoadingScreen && (
              <div className="mt-16 text-center">
                <p className="text-gray-600">Use the sidebar to define your search parameters and start searching</p>
                <button 
                  onClick={toggleSidebar}
                  className="mt-4 bg-linkedin hover:bg-linkedin/90 text-white py-2 px-6 rounded-lg transition-all duration-200"
                >
                  Open Search Parameters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
