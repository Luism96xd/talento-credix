
import React, { useState, useEffect } from 'react';
import { Building, Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Company {
  id: string;
  name: string;
  description: string;
  mission: string;
  vision: string;
}

interface CompanyTabProps {
  company: {
    id: string;
    name: string;
    description: string;
    mission: string;
    vision: string;
  };
  jobDetails: {
    requirements: string;
    responsibilities: string;
    benefits: string;
    fileUrl: string;
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
  const [companies, setCompanies] = useState<Company[]>([]);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('mayoreo.companies')
        .select('*')
        .order('name');

      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleCompanySelect = (companyId: string) => {
    const selectedCompany = companies.find(c => c.id === companyId);
    if (selectedCompany) {
      updateCompany(selectedCompany);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `job-descriptions/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('job_descriptions')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('job_descriptions')
        .getPublicUrl(filePath);

      updateJobDetails({ ...jobDetails, fileUrl: publicUrl });
      setFileName(file.name);
      
      toast({
        title: "Success",
        description: "Job description uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          Select Company
        </Label>
        <Select value={company.id} onValueChange={handleCompanySelect}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a company..." />
          </SelectTrigger>
          <SelectContent>
            {companies.map((comp) => (
              <SelectItem key={comp.id} value={comp.id}>
                {comp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {company.id && (
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <div>
            <Label className="text-sm font-medium">Company</Label>
            <p className="text-sm">{company.name}</p>
          </div>
          {company.description && (
            <div>
              <Label className="text-sm font-medium">Description</Label>
              <p className="text-sm text-gray-600">{company.description}</p>
            </div>
          )}
          {company.mission && (
            <div>
              <Label className="text-sm font-medium">Mission</Label>
              <p className="text-sm text-gray-600">{company.mission}</p>
            </div>
          )}
          {company.vision && (
            <div>
              <Label className="text-sm font-medium">Vision</Label>
              <p className="text-sm text-gray-600">{company.vision}</p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Job Description (PDF)
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="job-description-upload"
          />
          <label htmlFor="job-description-upload">
            <Button variant="outline" disabled={uploading} asChild>
              <span className="flex items-center gap-2 cursor-pointer">
                <File className="h-4 w-4" />
                {uploading ? 'Uploading...' : 'Choose PDF'}
              </span>
            </Button>
          </label>
          {fileName && (
            <span className="text-sm text-gray-600">{fileName}</span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <Label>Requirements</Label>
          <Input
            placeholder="Key requirements for the position..."
            value={jobDetails.requirements}
            onChange={(e) => updateJobDetails({ ...jobDetails, requirements: e.target.value })}
          />
        </div>
        
        <div>
          <Label>Responsibilities</Label>
          <Input
            placeholder="Main responsibilities..."
            value={jobDetails.responsibilities}
            onChange={(e) => updateJobDetails({ ...jobDetails, responsibilities: e.target.value })}
          />
        </div>
        
        <div>
          <Label>Benefits</Label>
          <Input
            placeholder="Benefits offered..."
            value={jobDetails.benefits}
            onChange={(e) => updateJobDetails({ ...jobDetails, benefits: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyTab;
