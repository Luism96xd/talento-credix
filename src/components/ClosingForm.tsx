import { useState } from "react"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import { Input } from "./ui/input"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "@/hooks/use-toast"
import { Requisition } from "@/types"

interface ClosingFormProps{
    requisition: Requisition;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export const ClosingForm = ({ requisition, isModalOpen, setIsModalOpen }: ClosingFormProps) => {
    const [formData, setFormData] = useState({
        candidate_name: requisition?.candidate_name || "",
        admission_date: requisition?.admission_date || "",
    })

    const closeRequisition = async (id: string) => {
        try {
            const now = new Date();
            const created_at = new Date(requisition?.created_at);
            const days = (now.getTime() - created_at.getTime()) / (1000 * 3600 * 24)

            const { error} = await supabase
            .from('requisitions')
            .update({
                closed_date: now.toDateString(),
                new_candidate_name: formData.candidate_name, 
                admission_date: formData.admission_date,
                days_open: parseInt(days.toFixed(2)),
                status: 'closed'
            })
            .eq('id', id)

            if(error) throw error;

            toast({
                title: 'Requisición cerrada',
                description: 'Requisición cerrada con éxito',
            })
        } catch (error) {
            console.log(error)
            toast({
                title: 'Error al cerrar requisición',
                description: error.message,
                variant: 'destructive',
            })
        } finally{
            setIsModalOpen(false);
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cerrar requisición #{requisition?.id}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className='space-y-2'>
                        <label className="text-sm font-medium text-gray-700">Nombre del nuevo ingreso</label>
                        <Input
                            value={formData.candidate_name}
                            onChange={(e) => setFormData(prev => ({ ...prev, candidate_name: e.target.value }))}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className="text-sm font-medium text-gray-700">Fecha de ingreso</label>
                        <Input
                            value={formData.admission_date}
                            type="date"
                            onChange={(e) => setFormData(prev => ({ ...prev, admission_date: e.target.value }))}
                        />
                    </div>

                    <Button onClick={() => closeRequisition(requisition?.id)}>
                        Cerrar vacante
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}