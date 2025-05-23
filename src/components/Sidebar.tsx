
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Briefcase, User, Calendar, FileText, Building, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanyTab from './CompanyTab';
import ProfileTab from './ProfileTab';
import CultureTab from './CultureTab';
import NotesTab from './NotesTab';
import CompaniesManagement from './CompaniesManagement';
import SearchesManagement from './SearchesManagement';
import { SearchParams } from '@/hooks/useSavedSearchParams';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  searchParams: SearchParams;
  updateParams: (section: keyof SearchParams, data: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  searchParams,
  updateParams
}) => {
  const [activeTab, setActiveTab] = useState("company");
  
  return (
    <div className={cn(
      "fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-40 transform",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}
    style={{ width: isOpen ? '340px' : '0' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg text-gray-800">Search Parameters</h2>
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="company" className="flex flex-col items-center py-2">
                <Briefcase className="h-4 w-4 mb-1" />
                <span className="text-xs">Company</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex flex-col items-center py-2">
                <User className="h-4 w-4 mb-1" />
                <span className="text-xs">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="culture" className="flex flex-col items-center py-2">
                <Calendar className="h-4 w-4 mb-1" />
                <span className="text-xs">Culture</span>
              </TabsTrigger>
            </TabsList>

            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="notes" className="flex flex-col items-center py-2">
                <FileText className="h-4 w-4 mb-1" />
                <span className="text-xs">Notes</span>
              </TabsTrigger>
              <TabsTrigger value="companies" className="flex flex-col items-center py-2">
                <Building className="h-4 w-4 mb-1" />
                <span className="text-xs">Companies</span>
              </TabsTrigger>
              <TabsTrigger value="searches" className="flex flex-col items-center py-2">
                <Search className="h-4 w-4 mb-1" />
                <span className="text-xs">Searches</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="company">
              <CompanyTab 
                company={searchParams.company}
                jobDetails={searchParams.jobDetails}
                updateCompany={(data) => updateParams('company', data)}
                updateJobDetails={(data) => updateParams('jobDetails', data)}
              />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileTab 
                candidateProfile={searchParams.candidateProfile}
                updateProfile={(data) => updateParams('candidateProfile', data)}
              />
            </TabsContent>
            
            <TabsContent value="culture">
              <CultureTab 
                cultureFit={searchParams.cultureFit}
                updateCulture={(data) => updateParams('cultureFit', data)}
              />
            </TabsContent>
            
            <TabsContent value="notes">
              <NotesTab 
                notes={searchParams.notes}
                updateNotes={(notes) => updateParams('notes', notes)}
              />
            </TabsContent>

            <TabsContent value="companies">
              <CompaniesManagement />
            </TabsContent>

            <TabsContent value="searches">
              <SearchesManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {!isOpen && (
        <button 
          onClick={toggleSidebar}
          className="absolute top-20 left-full bg-white p-2 rounded-r-md shadow-md"
          aria-label="Open sidebar"
        >
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
