import React, { useState, useEffect } from 'react';
import { Building, Upload, File, CheckSquare, Square } from 'lucide-react'; // Added CheckSquare, Square
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from './ui/checkbox'; // Assuming this is ShadCN UI Checkbox

interface Company {
  id: string;
  name: string;
  description: string;
  mission: string;
  vision: string;
}

interface CompanySelectorProps {
  keywords: string,
  onChangeKeywords: (text: string) => void;
  selectedCompany: Company | null;
  onCompanySelect: (company: Company | null) => void;
  searchInitiated: boolean;
  jobDescriptionFileUrl: string; // Renamed for clarity
  onJobDescriptionUpload: (fileUrl: string, fileName: string) => void; // Renamed for clarity

  // New props for checkboxes
  referenceCompaniesChecked: boolean;
  onReferenceCompaniesChange: (checked: boolean) => void;
  competenceChecked: boolean;
  onCompetenceChange: (checked: boolean) => void;

  // New props for requisition file
  jobRequisitionFileUrl: string;
  onRequisitionFileUpload: (fileUrl: string, fileName: string) => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  keywords,
  onChangeKeywords,
  selectedCompany,
  onCompanySelect,
  searchInitiated,
  jobDescriptionFileUrl,
  onJobDescriptionUpload,
  referenceCompaniesChecked,
  onReferenceCompaniesChange,
  competenceChecked,
  onCompetenceChange,
  jobRequisitionFileUrl, // We might not use this directly for display if fileName is enough
  onRequisitionFileUpload
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [uploadingJobDescription, setUploadingJobDescription] = useState(false);
  const [jobDescriptionFileName, setJobDescriptionFileName] = useState('');

  // State for the new file upload
  const [uploadingRequisition, setUploadingRequisition] = useState(false);
  const [requisitionFileName, setRequisitionFileName] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    fetchCompanies();
  }, []);

  // If initial file names need to be set from props (e.g., if loading existing data)
  // useEffect(() => {
  //   if (jobDescriptionFileUrl) {
  //     // Potentially extract filename from URL if not passed separately
  //     // For simplicity, assuming we'd get filename from parent if it's pre-loaded
  //   }
  //   if (jobRequisitionFileUrl) {
  //     // same for requisition
  //   }
  // }, [jobDescriptionFileUrl, jobRequisitionFileUrl]);


  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name, description, mission, vision')
        .order('name');

      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch companies.",
        variant: "destructive"
      });
    }
  };

  const handleCompanySelect = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    onCompanySelect(company || null);
  };

  const handleJobDescriptionUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please upload a PDF file for job description.",
        variant: "destructive"
      });
      return;
    }

    setUploadingJobDescription(true);
    try {
      const fileExt = file.name.split('.').pop();
      const newFileName = `${Date.now()}_jd.${fileExt}`; // Added _jd for distinction
      const filePath = `job-descriptions/${newFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documentos') // Ensure this bucket exists and has correct policies
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage // Removed : { publicUrl } for clarity
        .from('documentos')
        .getPublicUrl(filePath);

      if (!data || !data.publicUrl) {
        throw new Error("Failed to get public URL for job description.");
      }

      onJobDescriptionUpload(data.publicUrl, file.name);
      setJobDescriptionFileName(file.name);

      toast({
        title: "Success",
        description: "Job description uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading job description:', error);
      toast({
        title: "Error",
        description: `Failed to upload job description: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive"
      });
    } finally {
      setUploadingJobDescription(false);
      // Clear the file input so the same file can be re-selected if needed after an error
      if (event.target) event.target.value = '';
    }
  };

  const handleRequisitionFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please upload a PDF file for job requisition.",
        variant: "destructive"
      });
      return;
    }

    setUploadingRequisition(true);
    try {
      const fileExt = file.name.split('.').pop();
      const newFileName = `${Date.now()}_req.${fileExt}`; // Added _req for distinction
      // IMPORTANT: Choose a different bucket or a different path
      // Option 1: Different bucket (e.g., 'job_requisitions')
      // Option 2: Subfolder in existing bucket (e.g., 'job_descriptions/requisitions/')
      // Let's use a new bucket 'job_requisitions' for clarity. Ensure it exists.
      const filePath = `job-requisitions/${newFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documentos') // Make sure this bucket exists in Supabase Storage
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage // Removed : { publicUrl } for clarity
        .from('documentos')
        .getPublicUrl(filePath);

      if (!data || !data.publicUrl) {
        throw new Error("Failed to get public URL for job requisition.");
      }

      onRequisitionFileUpload(data.publicUrl, file.name);
      setRequisitionFileName(file.name);

      toast({
        title: "Success",
        description: "Job requisition format uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading job requisition:', error);
      toast({
        title: "Error",
        description: `Failed to upload job requisition: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive"
      });
    } finally {
      setUploadingRequisition(false);
      if (event.target) event.target.value = '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 space-y-6"> {/* Increased space-y */}
      {/* Row 1: Company Select & Job Description Upload */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label className="flex items-center gap-2 mb-2">
            <Building className="h-4 w-4" />
            Seleccionar compañía
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
            Descripción del cargo (PDF)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleJobDescriptionUpload}
              disabled={uploadingJobDescription}
              className="hidden"
              id="job-description-upload" // Keep this ID unique
            />
            <label htmlFor="job-description-upload" className="flex-1">
              <Button variant="outline" disabled={uploadingJobDescription} asChild className="w-full">
                <span className="flex items-center justify-center gap-2 cursor-pointer">
                  <File className="h-4 w-4" />
                  {uploadingJobDescription ? 'Uploading...' : jobDescriptionFileName || 'Choose PDF'}
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Row 2: Checkboxes & Requisition Format Upload */}
      <div className="flex flex-col md:flex-row gap-4"> {/* items-end to align checkboxes with upload button if they are shorter */}
        {/* Checkboxes Section */}
        <div className="flex-1 flex flex-col space-y-3">
          <Label className="mb-1 text-sm font-medium">Opciones Adicionales</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="referenceCompanies"
              checked={referenceCompaniesChecked}
              onCheckedChange={onReferenceCompaniesChange}
            />
            <Label htmlFor="referenceCompanies" className="text-sm font-normal cursor-pointer">
              Incluir compañías de referencia
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Input id="keywords"
              value={keywords || ''}
              onChange={(e) => onChangeKeywords(e.target.value)}
              placeholder="Buscar por palabras clave"
              className="w-full text-black">
            </Input>
            {/*<Checkbox
              id="competence"
              checked={competenceChecked}
              onCheckedChange={onCompetenceChange}
            />
            <Label htmlFor="competence" className="text-sm font-normal cursor-pointer">
              Analizar competencias clave
            </Label>
            */}
          </div>
        </div>

        {/* Requisition File Upload Section */}
        <div className="flex-1 flex flex-col space-y-3">
          <Label className="flex items-center gap-2 mb-2">
            <Upload className="h-4 w-4" />
            Formato de requisición (PDF)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleRequisitionFileUpload}
              disabled={uploadingRequisition}
              className="hidden"
              id="job-requisition-upload" // New unique ID
            />
            <label htmlFor="job-requisition-upload" className="flex-1">
              <Button variant="outline" disabled={uploadingRequisition} asChild className="w-full">
                <span className="flex items-center justify-center gap-2 cursor-pointer">
                  <File className="h-4 w-4" />
                  {uploadingRequisition ? 'Uploading...' : requisitionFileName || 'Choose PDF'}
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Selected Company Details */}
      {selectedCompany && searchInitiated && (
        <div className="p-4 bg-gray-50 rounded-lg mt-6">
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