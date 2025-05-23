
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

interface CompanySelectorProps {
  selectedCompany: Company | null;
  onCompanySelect: (company: Company | null) => void;
  jobDescriptionFile: string;
  onFileUpload: (fileUrl: string, fileName: string) => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  selectedCompany,
  onCompanySelect,
  jobDescriptionFile,
  onFileUpload
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
        .rpc('sql', {
          query: 'SELECT id, name, description, mission, vision FROM mayoreo.companies ORDER BY name'
        });

      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleCompanySelect = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    onCompanySelect(company || null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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

      onFileUpload(publicUrl, file.name);
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
    <div className="w-full max-w-4xl mx-auto mt-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label className="flex items-center gap-2 mb-2">
            <Building className="h-4 w-4" />
            Select Company
          </Label>
          <Select value={selectedCompany?.id || ''} onValueChange={handleCompanySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a company..." />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Label className="flex items-center gap-2 mb-2">
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
            <label htmlFor="job-description-upload" className="flex-1">
              <Button variant="outline" disabled={uploading} asChild className="w-full">
                <span className="flex items-center gap-2 cursor-pointer">
                  <File className="h-4 w-4" />
                  {uploading ? 'Uploading...' : fileName || 'Choose PDF'}
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      {selectedCompany && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">{selectedCompany.name}</h4>
          {selectedCompany.description && (
            <p className="text-sm text-gray-600 mb-2">{selectedCompany.description}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {selectedCompany.mission && (
              <div>
                <span className="font-medium">Mission:</span>
                <p className="text-gray-600">{selectedCompany.mission}</p>
              </div>
            )}
            {selectedCompany.vision && (
              <div>
                <span className="font-medium">Vision:</span>
                <p className="text-gray-600">{selectedCompany.vision}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySelector;
