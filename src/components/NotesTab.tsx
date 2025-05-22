
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NotesTabProps {
  notes: string;
  updateNotes: (notes: string) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({
  notes,
  updateNotes
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-800">Additional Notes</h3>
        <p className="text-sm text-gray-500">Add any additional criteria, preferences, or special requirements for this search.</p>
        
        <div className="mt-2">
          <Label htmlFor="additional-notes">Notes</Label>
          <Textarea 
            id="additional-notes"
            value={notes}
            onChange={(e) => updateNotes(e.target.value)}
            placeholder="Add your notes here..."
            className="min-h-[200px] mt-1"
          />
        </div>
      </div>
      
      <div className="bg-success-light p-3 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Keyboard Shortcut:</strong> Press Ctrl+Enter or Cmd+Enter to save your notes.
        </p>
      </div>
    </div>
  );
};

export default NotesTab;
