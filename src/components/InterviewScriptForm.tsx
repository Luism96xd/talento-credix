import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader } from 'lucide-react';
import { FileUpload } from './candidates/FileUpload';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '@/contexts/AuthContext';

const WEBHOOK_URL = 'https://n8n.mayoreo.biz/webhook/34db09fd-2cdc-48e8-a275-e3b8ceea407b';

export const InterviewScriptForm: React.FC = () => {
  const [taskId, setTaskId] = useState(null);
  const [url, setUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cvFiles: [] as File[],
    jobDescriptionFile: [] as File[] | null,
    name: "" as string
  });

  // Ref para almacenar la suscripción de Supabase para poder desuscribirse
  const supabaseSubscriptionRef = useRef(null);

  const { toast } = useToast(); // Inicializa el hook de toast
  const { user } = useAuth();


  useEffect(() => {
    // Verificar si supabase está inicializado
    if (!supabase) {
      console.log("Error: Supabase client no está inicializado. Asegúrate de que la librería esté cargada globalmente.");
      return;
    }
    if (!taskId) return; // No suscribirse si no hay un ID de tarea

    // Desuscribirse de cualquier suscripción anterior para evitar duplicados
    if (supabaseSubscriptionRef.current) {
      console.log(`Desuscribiéndose de la suscripción anterior.`);
      supabaseSubscriptionRef.current.unsubscribe();
      supabaseSubscriptionRef.current = null;
    }


    // Suscribirse al canal de Realtime para la tabla 'task_progress'
    const subscription = supabase
      .channel(`task_progress_${taskId}`) // Nombre de canal único por tarea
      .on(
        'postgres_changes',
        {
          event: 'UPDATE', // Escuchamos INSERTS ya que n8n insertará nuevos resultados por paso
          schema: 'mayoreo', // Usando tu esquema
          table: 'task_progress', // Usando tu tabla
          filter: `id=eq.${taskId}`, // Filtrando por el ID de tarea actual
        },
        (payload) => {
          console.log('Cambio en Supabase Realtime recibido:', payload);
          const { url, data, status } = payload.new;
          if (status === 'completed') {
            setContent(data);
            setUrl(url);
            setCurrentStep(2);
            setIsLoading(false);
          }
        }
      )
      .subscribe();

    supabaseSubscriptionRef.current = subscription;
    return () => {
      if (supabaseSubscriptionRef.current && typeof supabaseSubscriptionRef.current.unsubscribe === 'function') {
        console.log(`Desuscrito del taskId: ${taskId}`);
        supabaseSubscriptionRef.current.unsubscribe();
        supabaseSubscriptionRef.current = null;
      }
    };
  }, [taskId, currentStep]);

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: 'Sesión expirada',
        description: 'Por favor, inicie sesión nuevamente',
        variant: 'destructive',
      });
      return
    }

    // Validaciones
    if (formData.cvFiles.length === 0) {
      toast({
        title: 'Archivos Faltantes',
        description: 'Por favor, carga al menos un CV de candidato.',
        variant: 'destructive',
      });
      return;
    }

    const { data: taskData, error } = await supabase
      .from('task_progress')
      .insert({ step: 0, status: 'processing' })
      .select('id')
      .single()

    if (error) throw error

    const data = new FormData();
    setTaskId(taskData.id);

    // Append all text fields
    data.append('taskId', taskData.id);

    // Append all file arrays
    formData.cvFiles.forEach((file) => {
      data.append('cvFiles', file);
    });

    // Append single file inputs
    if (formData.jobDescriptionFile && formData.jobDescriptionFile.length > 0) {
      data.append('jobDescriptionFile', formData.jobDescriptionFile[0]);
    }

    data.append('name', formData.name)
    data.append('email', user.email)

    console.log('Sending FormData:', data);
    setIsLoading(true)
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Error en webhook: ${response.status}`);
      }
      const responseData = await response.json();
      setContent(responseData.output);
      console.log('Webhook response:', responseData);
      toast({
        title: '¡Envío Exitoso!',
        description: 'Los documentos y el contexto se han enviado correctamente.',
      });
    } catch (error) {
      console.error('Failed to send data:', error);
      toast({
        title: 'Error de Envío',
        description: 'Hubo un problema al enviar los datos. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subir Documentos</CardTitle>
        <CardDescription>
          Carga el CV del candidato, escribe el nombre del cargo o sube el archivo PDF
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
          <div className="mt-12 text-center animate-fade-in">
            <div className="mb-4 flex justify-center">
              <Loader className="h-12 w-12 text-linkedin animate-spin" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Generando guión de entrevista</h3>
            <p className="text-gray-500 mb-6">Generando guión de entrevista para el candidato...</p>
          </div>
        )}
        {!isLoading && <>
          {currentStep === 1 && (
            <div className='flex flex-col gap-2'>

              <div className='space-y-2'>
                <label className="text-sm font-medium text-gray-700">Nombre del cargo a entrevistar</label>
                <p className="text-xs text-gray-500">Escriba el nombre del cargo </p>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>


              <FileUpload
                label="Descripción del Cargo"
                description="Documento con requisitos y competencias del puesto en formato PDF"
                files={formData.jobDescriptionFile}
                multiple={false}
                onFileSelect={(file) => setFormData(prev => ({ ...prev, jobDescriptionFile: file ? file : null }))}
              />
              <FileUpload
                label="CV del candidato"
                description="Curriculum vitae del candidato en formato PDF."
                files={formData.cvFiles}
                multiple={false}
                onFileSelect={(files) => setFormData(prev => ({ ...prev, cvFiles: files as File[] }))}
              />

              <Button onClick={handleSubmit} className='bg-primary w-full'>Enviar</Button>
            </div>
          )}
          {currentStep === 2 && (
            <div className='flex flex-col gap-4 p-2'>
              <a target="_blank" className="text-center text-linkedin bg-linkedin hover:bg-linkedin text-white py-2 px-6 rounded-xl transition-all duration-200 md:flex items-center justify-center" href={url ? url : "#"}>Haga clic aquí para ver el informe</a>
              {/*<Markdown>{content}</Markdown>*/}
            </div>
          )}
        </>}
      </CardContent>
    </Card>
  );
};