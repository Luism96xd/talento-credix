
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CultureTabProps {
  cultureFit: {
    values: string[];
    traits: string[];
  };
  updateCulture: (data: any) => void;
}

const CultureTab: React.FC<CultureTabProps> = ({
  cultureFit,
  updateCulture
}) => {
  const handleCultureChange = (field: string, value: string[]) => {
    updateCulture({ [field]: value });
  };
  
  const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(',').map(value => value.trim());
    handleCultureChange('values', values);
  };
  
  const handleTraitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const traits = e.target.value.split(',').map(trait => trait.trim());
    handleCultureChange('traits', traits);
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
        <h3 className="font-medium text-gray-800">Cultural Fit Criteria</h3>
        <p className="text-sm text-gray-500">Define the cultural values and personal traits that would make a candidate successful in your organization.</p>
        
        <div className="space-y-3 mt-2">
          <div className="space-y-1">
            <Label htmlFor="company-values">Company Values (comma-separated)</Label>
            <Input 
              id="company-values"
              value={cultureFit.values.join(', ')}
              onChange={handleValuesChange}
              onKeyDown={handleKeyPress}
              placeholder="e.g. Innovation, Teamwork, Excellence"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="desired-traits">Desired Traits (comma-separated)</Label>
            <Input 
              id="desired-traits"
              value={cultureFit.traits.join(', ')}
              onChange={handleTraitsChange}
              onKeyDown={handleKeyPress}
              placeholder="e.g. Self-motivated, Collaborative, Problem-solver"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-linkedin-light p-3 rounded-lg mt-4">
        <p className="text-sm text-gray-700">
          <strong>Tip:</strong> Focusing on cultural fit helps find candidates who will thrive in your work environment and contribute to your team dynamic.
        </p>
      </div>
    </form>
  );
};

export default CultureTab;
