import React from 'react';
import { Mail, Phone, Briefcase, Calendar } from 'lucide-react';
import { Candidate } from '../../types';
import { handleDragStart } from '@/utils/dragAndDrop';

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
}

export default function CandidateCard({ candidate, onClick }: CandidateCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, candidate.id)}
      onDoubleClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-move hover:shadow-md transition-all hover:-translate-y-1"
    >
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{candidate.name}</h4>
          <p className="text-gray-600 text-xs font-medium">{candidate.position}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-600">
            <Mail className="h-3 w-3 mr-2" />
            <span className="truncate">{candidate.email}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Phone className="h-3 w-3 mr-2" />
            <span>{candidate.phone}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Calendar className="h-3 w-3 mr-2" />
            <span>{new Date(candidate.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {candidate.profileData.experience.length > 0 && (
          <div className="flex items-center text-xs text-gray-500">
            <Briefcase className="h-3 w-3 mr-1" />
            <span className="truncate">
              {candidate.profileData.experience[0].position} en {candidate.profileData.experience[0].company}
            </span>
          </div>
        )}
        
        {candidate.profileData.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {candidate.profileData.skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {candidate.profileData.skills.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{candidate.profileData.skills.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}