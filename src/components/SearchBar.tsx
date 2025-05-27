
import React, { useState, useRef, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import TypewriterText from './TypewriterText';

interface SearchBarProps {
  onSearch: (position: string, location: string) => void;
  placeholderPosition?: string;
  placeholderLocation?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholderPosition = "Asesor de ventas",
  placeholderLocation = "Valencia, Venezuela"
}) => {
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [activeInput, setActiveInput] = useState<'position' | 'location' | null>(null);
  
  const positionInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(position, location);
    }
  };
  
  const handleSearchClick = () => {
    onSearch(position, location);
  };

  const handleInputFocus = (input: 'position' | 'location') => {
    setActiveInput(input);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="relative flex flex-col md:flex-row items-center p-2 bg-white rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-linkedin">
        <div className="relative flex items-center w-full md:w-1/2 p-2 border-b md:border-b-0 md:border-r border-gray-200">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            ref={positionInputRef}
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            onKeyDown={handleKeyPress}
            onFocus={() => handleInputFocus('position')}
            onBlur={() => setActiveInput(null)}
            placeholder={
              activeInput === 'position' || typewriterComplete ? 
              placeholderPosition : 
              ''
            }
            className="w-full outline-none text-gray-600 placeholder:text-gray-400"
            aria-label="Job position"
          />
          {!position && activeInput !== 'position' && !typewriterComplete && (
            <div className="absolute left-9 pointer-events-none">
              <TypewriterText 
                text={placeholderPosition}
                onComplete={() => setTypewriterComplete(true)}
              />
            </div>
          )}
        </div>
        
        <div className="relative flex items-center w-full md:w-1/2 p-2">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            ref={locationInputRef}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyPress}
            onFocus={() => handleInputFocus('location')}
            onBlur={() => setActiveInput(null)}
            placeholder={activeInput === 'location' ? placeholderLocation : ''}
            className="w-full outline-none text-gray-600 placeholder:text-gray-400"
            aria-label="Location"
          />
          {!location && activeInput !== 'location' && typewriterComplete && !activeInput && (
            <div className="absolute left-9 pointer-events-none">
              <TypewriterText text={placeholderLocation} />
            </div>
          )}
        </div>
        
        <button 
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-linkedin hover:bg-linkedin/90 text-white py-2 px-6 rounded-xl transition-all duration-200 hidden md:flex items-center justify-center"
        >
          Search
        </button>
      </div>
      
      <button 
        onClick={handleSearchClick}
        className="w-full mt-3 bg-linkedin hover:bg-linkedin/90 text-white py-3 px-6 rounded-xl transition-all duration-200 md:hidden flex items-center justify-center"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
