import React, { useState, ChangeEvent } from 'react';
import { FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (file) {
      onFileUpload(file);
      setFile(null); // Clear the input after upload
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="document">Document</Label>
      <div className="flex gap-2">
        <Input id="document" type="file" onChange={handleFileChange} />
        <Button onClick={handleUploadClick} disabled={!file}>
          <FileUp className="h-4 w-4 mr-2" /> Upload
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;