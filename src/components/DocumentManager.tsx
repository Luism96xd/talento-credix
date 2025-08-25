import React, { useState } from 'react';
import { X, Upload, FileText, Download, Trash2, Plus, Eye } from 'lucide-react';
import { Candidate, CandidateDocument } from '@/types';
import { useSupabaseQuery, useSupabaseMutation } from '@/hooks/useSupabase';

interface DocumentManagerProps {
  candidate: Candidate;
  onClose: () => void;
}

const documentTypes = [
  { value: 'cv', label: 'Currículum Vitae', color: 'bg-blue-100 text-blue-800' },
  { value: 'psychometric_test', label: 'Prueba Psicométrica', color: 'bg-purple-100 text-purple-800' },
  { value: 'disc_test', label: 'Prueba DISC', color: 'bg-green-100 text-green-800' },
  { value: 'contract', label: 'Contrato', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'medical_exam', label: 'Examen Médico', color: 'bg-red-100 text-red-800' },
  { value: 'other', label: 'Otro', color: 'bg-gray-100 text-gray-800' }
];

export default function DocumentManager({ candidate, onClose }: DocumentManagerProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    documentType: 'cv' as CandidateDocument['document_type'],
    documentName: '',
    file: null as File | null
  });

  const { data: documents, loading, refetch } = useSupabaseQuery<CandidateDocument>(
    'candidate_documents',
    '*',
    { column: 'uploaded_at', ascending: false }
  );

  const { insert, remove, loading: mutationLoading } = useSupabaseMutation<CandidateDocument>('candidate_documents');

  const candidateDocuments = documents.filter(doc => doc.candidate_id === candidate.id);

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadData.file || !uploadData.documentName.trim()) {
      alert('Por favor, complete todos los campos y seleccione un archivo.');
      return;
    }

    try {
      // En una implementación real, subirías el archivo a un servidor
      const documentUrl = URL.createObjectURL(uploadData.file);
      
      await insert({
          candidate_id: candidate.id,
          document_type: uploadData.documentType,
          document_name: uploadData.documentName.trim(),
          document_url: documentUrl,
          uploaded_by: 'Usuario Actual', // En una implementación real, obtener del contexto de usuario
          uploaded_at: new Date()
      });

      setUploadData({
        documentType: 'cv',
        documentName: '',
        file: null
      });
      setShowUploadForm(false);
      refetch();
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error al subir el documento');
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (confirm('¿Está seguro de que desea eliminar este documento?')) {
      try {
        await remove(documentId);
        refetch();
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Error al eliminar el documento');
      }
    }
  };

  const getDocumentTypeInfo = (type: string) => {
    return documentTypes.find(dt => dt.value === type) || documentTypes[documentTypes.length - 1];
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Carpeta de {candidate.name}</h3>
            <p className="text-gray-600">Gestión de documentos del candidato</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Subir Documento
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {candidateDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay documentos</h3>
              <p className="text-gray-600 mb-4">Este candidato no tiene documentos subidos</p>
              <button
                onClick={() => setShowUploadForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                Subir Primer Documento
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {candidateDocuments.map((document) => {
                const typeInfo = getDocumentTypeInfo(document.document_type);
                return (
                  <div key={document.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                        <h4 className="font-medium text-gray-900 mt-2">{document.document_name}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(document.uploaded_at).toLocaleDateString()}
                        </p>
                        {document.uploaded_by && (
                          <p className="text-xs text-gray-500">Por: {document.uploaded_by}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(document.document_url, '_blank')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </button>
                      <a
                        href={document.document_url}
                        download={document.document_name}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Descargar
                      </a>
                      <button
                        onClick={() => handleDeleteDocument(document.id)}
                        disabled={mutationLoading}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900">Subir Documento</h4>
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleFileUpload} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Documento
                    </label>
                    <select
                      value={uploadData.documentType}
                      onChange={(e) => setUploadData({ 
                        ...uploadData, 
                        documentType: e.target.value as CandidateDocument['document_type']
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {documentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Documento
                    </label>
                    <input
                      type="text"
                      required
                      value={uploadData.documentName}
                      onChange={(e) => setUploadData({ ...uploadData, documentName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ej: CV Actualizado 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Archivo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        required
                        onChange={(e) => setUploadData({ ...uploadData, file: e.target.files?.[0] || null })}
                        className="hidden"
                        id="document-upload"
                      />
                      <label htmlFor="document-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        {uploadData.file ? (
                          <p className="text-green-600 font-medium">{uploadData.file.name}</p>
                        ) : (
                          <p className="text-gray-600">Seleccionar archivo</p>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={mutationLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                  >
                    {mutationLoading ? 'Subiendo...' : 'Subir Documento'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}