
import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export const useTypewriter = ({ 
  text, 
  delay = 50,
  onComplete 
}: UseTypewriterOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const reset = useCallback(() => {
    setDisplayText('');
    setIndex(0);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (text !== displayText && !isComplete) {
      reset();
    }
  }, [text, displayText, isComplete, reset]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else if (!isComplete && index === text.length) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [index, delay, text, onComplete, isComplete]);

  return {
    displayText,
    isTyping: index < text.length,
    isComplete,
    reset
  };
};
