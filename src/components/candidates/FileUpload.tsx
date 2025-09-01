import React, { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (files: File[] | null) => void;
  accept?: string;
  label: string;
  description?: string;
  files?: File[] | null;
  multiple?: boolean;
  maxFiles?: number;
  required?: boolean;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.pdf',
  label,
  description,
  files,
  multiple = false,
  maxFiles = multiple ? 2 : 1, // Un valor por defecto más común para múltiple
  required = false,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const currentFiles = files || [];
      const newFilesArray = Array.from(droppedFiles);
      const allFiles = multiple
        ? [...currentFiles, ...newFilesArray].slice(0, maxFiles)
        : [newFilesArray[0]];
      onFileSelect(allFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = multiple ? Array.from(selectedFiles).slice(0, maxFiles) : [selectedFiles[0]];
      onFileSelect(newFiles);
    }
    // Limpiar el valor para permitir seleccionar el mismo archivo de nuevo
    const currentFiles = files || [];
    const newFilesArray = Array.from(selectedFiles);
    const allFiles = multiple
      ? [...currentFiles, ...newFilesArray].slice(0, maxFiles)
      : [newFilesArray[0]];
    onFileSelect(allFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (fileIndex: number) => {
    if (!files) return;
    const updatedFiles = files.filter((_, index) => index !== fileIndex);
    // Si el array queda vacío, pasamos null para mostrar de nuevo el dropzone
    onFileSelect(updatedFiles.length > 0 ? updatedFiles : null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}

      <div
          className={cn(
            'mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            isDragging ? 'border-primary-500 bg-red-50' : 'border-gray-300 hover:border-gray-400',
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">
            Arrastra los archivos aquí o <span className="font-semibold text-primary-600">haz clic para buscar</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {accept ? `Soportados: ${accept.toUpperCase()}` : ''}
            {multiple && ` (hasta ${maxFiles} archivos)`}
          </p>
        </div>
      {files && files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-2 truncate">
                <File className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-800 truncate" title={file.name}>
                  {file.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:bg-primary-700 hover:text-red-700 h-7 w-7 p-0"
                type="button" // Evita que envíe un formulario
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};