import React from 'react';
import { Building } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Company {
  id: string;
  name: string;
}

interface CompanySelectProps {
  companies: Company[];
  selectedCompanyId: string | null;
  onCompanySelect: (companyId: string) => void;
}

const CompanySelect: React.FC<CompanySelectProps> = ({
  companies,
  selectedCompanyId,
  onCompanySelect,
}) => {
  return (
    <div className="flex-1">
      <Label className="flex items-center gap-2 mb-2">
        <Building className="h-4 w-4" />
        Seleccionar compañía
      </Label>
      <Select value={selectedCompanyId || ''} onValueChange={onCompanySelect}>
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
  );
};

export default CompanySelect;