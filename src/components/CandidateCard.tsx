
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CandidateProps {
  id: string
  name: string
  title: string
  link: string
  connections: string
  description: String
  education: string
  experience: string
  search_id: string
  image: string
  score: number
}


const CandidateCard: React.FC<CandidateProps> = ({
  id,
  name,
  title,
  link,
  connections,
  description,
  experience,
  education,
  image,
  score
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col md:flex-row gap-4 animate-fade-in">
      <div className="flex-shrink-0 flex justify-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-linkedin text-white">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between">
          <h3 className="font-medium text-lg">{name}</h3>
        </div>

        <div className="flex flex-col md:flex-row text-sm text-gray-600 gap-y-1 md:gap-x-4">
          <div>{title}</div>
          {experience && <div>{experience}</div>}
          {education && <div>{education}</div>}
        </div>
        <div className="flex flex-row justify-between w-full items-center">
          <div className="flex flex-wrap gap-2 pt-2">
            <p>Conexiones:{connections && <div>{connections}</div>}</p>
          </div>
        </div>
        {/*<div className="flex flex-wrap gap-2 pt-2">
          {skills.slice(0, 3).map((skill, i) => (
            <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>*/}
      </div>


      <div className="text-xs text-gray-500 flex flex-col gap-4 min-w-[150px]">
        <div>
          <div className="flex items-center space-x-1 mt-1 md:mt-0">
            <span className="text-sm font-medium">Match Score:</span>
            <span
              className={cn(
                "font-bold",
                score >= 85 ? "text-success" :
                  score >= 70 ? "text-amber-500" :
                    "text-gray-500"
              )}
            >
              {score}%
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div
            className="progress-bar h-full"
            style={{ width: `${score}%` }}
          />
        </div>
        <div className='flex flex-row gap-4'>
          <span>Match criteria</span>
          <button className="text-linkedin hover:text-linkedin/80 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            Details
          </button>
        </div>
        <Link to={link} className="text-linkedin bg-linkedin hover:bg-linkedin/90 text-white py-2 px-6 rounded-xl transition-all duration-200 hidden md:flex items-center justify-center">
          Ver perfil
        </Link>
      </div>
    </div>
  );
};

export default CandidateCard;
