
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CompanyTabProps {
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
  updateCompany: (data: any) => void;
  updateJobDetails: (data: any) => void;
}

const CompanyTab: React.FC<CompanyTabProps> = ({
  company,
  jobDetails,
  updateCompany,
  updateJobDetails
}) => {
  const handleCompanyChange = (field: string, value: string) => {
    updateCompany({ [field]: value });
  };
  
  const handleJobDetailsChange = (field: string, value: string | string[]) => {
    updateJobDetails({ [field]: value });
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    handleJobDetailsChange('skills', skills);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextInput = e.currentTarget.form?.elements[
        Array.from(e.currentTarget.form.elements).indexOf(e.currentTarget) + 1
      ] as HTMLElement;
      nextInput?.focus();
    }
  };
  
  return (
    <form className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-800">Company Information</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="company-name">Company Name</Label>
            <Input 
              id="company-name"
              value={company.name}
              onChange={(e) => handleCompanyChange('name', e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="e.g. Acme Corporation"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="industry">Industry</Label>
            <Input 
              id="industry"
              value={company.industry}
              onChange={(e) => handleCompanyChange('industry', e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="e.g. Technology"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="company-size">Company Size</Label>
            <Input 
              id="company-size"
              value={company.size}
              onChange={(e) => handleCompanyChange('size', e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="e.g. 100-500 employees"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2 pt-4 border-t">
        <h3 className="font-medium text-gray-800">Job Details</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="job-title">Job Title</Label>
            <Input 
              id="job-title"
              value={jobDetails.title}
              onChange={(e) => handleJobDetailsChange('title', e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="experience">Required Experience</Label>
            <Input 
              id="experience"
              value={jobDetails.experience}
              onChange={(e) => handleJobDetailsChange('experience', e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="e.g. 3+ years"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="skills">Required Skills (comma-separated)</Label>
            <Input 
              id="skills"
              value={jobDetails.skills.join(', ')}
              onChange={handleSkillsChange}
              onKeyDown={handleKeyPress}
              placeholder="e.g. React, TypeScript, Node.js"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CompanyTab;
