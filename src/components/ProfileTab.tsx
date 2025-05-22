
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ProfileTabProps {
  candidateProfile: {
    education: string;
    skills: string[];
    experience: string;
  };
  updateProfile: (data: any) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  candidateProfile,
  updateProfile
}) => {
  const handleProfileChange = (field: string, value: string | string[]) => {
    updateProfile({ [field]: value });
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    handleProfileChange('skills', skills);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.currentTarget.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        const elements = Array.from(form.elements);
        const currentIndex = elements.indexOf(e.currentTarget);
        const nextElement = elements[currentIndex + 1] as HTMLElement;
        if (nextElement) {
          nextElement.focus();
        }
      }
    }
  };
  
  return (
    <form className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-800">Candidate Profile</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="education">Education Requirements</Label>
            <Input 
              id="education"
              value={candidateProfile.education}
              onChange={(e) => handleProfileChange('education', e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="e.g. Bachelor's in Computer Science"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="candidate-skills">Desired Skills (comma-separated)</Label>
            <Input 
              id="candidate-skills"
              value={candidateProfile.skills.join(', ')}
              onChange={handleSkillsChange}
              onKeyDown={handleKeyPress}
              placeholder="e.g. JavaScript, React, AWS"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="candidate-experience">Experience Description</Label>
            <Textarea 
              id="candidate-experience"
              value={candidateProfile.experience}
              onChange={(e) => handleProfileChange('experience', e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Describe the ideal experience for this candidate..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileTab;
