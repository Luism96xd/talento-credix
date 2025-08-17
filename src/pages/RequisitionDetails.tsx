import { ClosingForm } from "@/components/ClosingForm";
import { Button } from "@/components/ui/button";
import { Requisition } from "@/types";
import { useState } from "react";

const RequisitionDetails = ({ requisition }: { requisition: Requisition }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const formatNullableDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString; // Fallback if invalid date
        }
    };
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl max-h-[500px] shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-y-scroll border border-gray-100 flex flex-col md:flex-row mb-6">
                <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 break-words max-w-[90%]">
                            Solicitud: {requisition.position_name || 'Puesto no especificado'}
                        </h2>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${requisition.status === 'open'
                                ? 'bg-green-100 text-green-800'
                                : requisition.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            {requisition.status.toUpperCase()}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <p><span className="font-medium text-gray-600">ID:</span> {requisition.id.substring(0, 8)}...</p>
                        <p><span className="font-medium text-gray-600">Tipo de Contrato:</span> {requisition.contract_type || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">Ubicación de Trabajo:</span> {requisition.work_location || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">Fecha de Solicitud:</span> {formatNullableDate(requisition.request_date)}</p>
                        <p><span className="font-medium text-gray-600">Impacto en Departamento:</span> {requisition.department_impact || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">Impacto en Compañía:</span> {requisition.company_impact || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">Nivel Académico:</span> {requisition.academic_level || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">Experiencia:</span> {requisition.experience || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">¿Requiere Computadora?:</span> {requisition.requiere_computador ? 'Sí' : 'No'}</p>
                        <p><span className="font-medium text-gray-600">¿Confidencial?:</span> {requisition.is_confidential ? 'Sí' : 'No'}</p>
                    </div>

                    <div className="flex flex-row justify-between items-center">
                        <div className="mt-6 border-t border-gray-100 pt-4 text-sm text-gray-600">
                            <p><span className="font-medium text-gray-600">Solicitado Por:</span> {requisition.requested_by_name || 'N/A'} ({requisition.requested_by_position || 'N/A'}) el {formatNullableDate(requisition.requested_by_date)}</p>
                            <p><span className="font-medium text-gray-600">Aprobado Por:</span> {requisition.approved_by_name || 'N/A'} ({requisition.approved_by_position || 'N/A'}) el {formatNullableDate(requisition.approved_by_date)}</p>
                            <p className="mt-2"><span className="font-medium text-gray-600">Creada el:</span> {formatNullableDate(requisition.created_at)}</p>
                        </div>
                        {requisition.status === 'open' && (<Button
                            onClick={() => setIsModalOpen(true)}
                        >
                            Cerrar requisición
                        </Button>)}
                        <ClosingForm requisition={requisition} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></ClosingForm>
                    </div>

                    {/* Displaying JSONB fields as formatted JSON for simplicity */}
                    {requisition.key_competencies && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                            <p className="font-medium text-gray-700 mb-1">Competencias Clave:</p>
                            <ul className="mt-4 list-disc list-inside">
                                {requisition.key_competencies.map((competency, index) => (
                                    <li key={index} className="mb-1">{competency}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {requisition.technical_competencies && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                            <p className="font-medium text-gray-700 mb-1">Competencias Técnicas:</p>
                            <ul className="mt-4 list-disc list-inside">
                                {requisition.technical_competencies.map((competency, index) => (
                                    <li key={index} className="mb-1">{competency}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default RequisitionDetails; 
