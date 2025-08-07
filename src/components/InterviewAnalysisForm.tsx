import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader } from 'lucide-react';
import { FileUpload } from './candidates/FileUpload';
import { Button } from './ui/button';

const WEBHOOK_URL = 'https://n8n.mayoreo.biz/webhook/c4407cf8-2c19-4b8c-997e-7294106a4eec';

export const InterviewAnalysisForm: React.FC = () => {
  const [taskId, setTaskId] = useState(null);
  const [url, setUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cvFiles: [] as File[],
    psychometricTests: [] as File[],
    jobDescriptionFile: [] as File[] | null,
    inverview_transcript: [] as File[],
    discTests: [] as File[],
    discSupervisorFile: [] as File[] | null,
  });

  // Ref para almacenar la suscripción de Supabase para poder desuscribirse
  const supabaseSubscriptionRef = useRef(null);

  const { toast } = useToast(); // Inicializa el hook de toast
  const { user } = useAuth();

  // Función para generar un ID de tarea único
  const generateTaskId = () => {
    return 'task-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

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
          filter: `task_id=eq.${taskId}`, // Filtrando por el ID de tarea actual
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

    if (formData.psychometricTests.length === 0) {
      toast({
        title: 'Archivos Faltantes',
        description: 'Por favor, carga al menos una prueba psicométrica.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.inverview_transcript || formData.inverview_transcript.length === 0) {
      toast({
        title: 'Archivo Faltante',
        description: 'Por favor, carga la transcripción de la entrevista',
        variant: 'destructive',
      });
      return;
    }


    if (!formData.jobDescriptionFile || formData.jobDescriptionFile.length === 0) {
      toast({
        title: 'Archivo Faltante',
        description: 'Por favor, carga la descripción del cargo.',
        variant: 'destructive',
      });
      return;
    }

    const taskId = generateTaskId();
    const data = new FormData();
    ;(supabase as any).from('task_progress').insert({ task_id: taskId, step: 0, status: 'processing' } as any)
    setTaskId(taskId);

    // Append all text fields
    data.append('taskId', taskId);

    // Append all file arrays
    formData.cvFiles.forEach((file) => {
      data.append('cvFiles', file);
    });
    formData.psychometricTests.forEach((file) => {
      data.append('psychometricTests', file);
    });

    if (formData.discTests && formData.discTests.length > 0) {
      formData.discTests.forEach((file) => {
        data.append('discTests', file);
      });
    }
    // Append single file inputs
    if (formData.inverview_transcript && formData.inverview_transcript.length > 0) {
      data.append('transcript', formData.inverview_transcript[0]);
    }
    // Append single file inputs
    if (formData.jobDescriptionFile && formData.jobDescriptionFile.length > 0) {
      data.append('jobDescriptionFile', formData.jobDescriptionFile[0]);
    }
    if (formData.discSupervisorFile && formData.discSupervisorFile.length > 0) {
      data.append('discSupervisorFile', formData.discSupervisorFile[0]);
    }

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
          Carga el CV del candidato, la descripción del cargo y la transcripción de la entrevista
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
          <div className="mt-12 text-center animate-fade-in">
            <div className="mb-4 flex justify-center">
              <Loader className="h-12 w-12 text-linkedin animate-spin" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Analizando entrevista</h3>
            <p className="text-gray-500 mb-6">Analizando transcripción de la entrevista del candidato</p>
          </div>
        )}
        {!isLoading && <>
          {currentStep === 1 && (
            <div className='flex flex-col gap-2'>
              <FileUpload
                label="CV del candidato"
                description="Curriculum vitae del candidato en formato PDF."
                files={formData.cvFiles}
                multiple={false}
                onFileSelect={(files) => setFormData(prev => ({ ...prev, cvFiles: files as File[] }))}
              />

              <FileUpload
                label="Descripción del Cargo"
                description="Documento con requisitos y competencias del puesto en formato PDF"
                files={formData.jobDescriptionFile}
                multiple={false}
                onFileSelect={(file) => setFormData(prev => ({ ...prev, jobDescriptionFile: file ? file : null }))}
              />
              <FileUpload
                label="Transcripción de la entrevista"
                description="Archivo con la transcripción de la entrevista"
                files={formData.inverview_transcript}
                multiple={false}
                onFileSelect={(files) => setFormData(prev => ({ ...prev, inverview_transcript: files as File[] }))}
              />

              <FileUpload
                label="Pruebas psicotécnicas"
                description="Resultados de las pruebas psicotécnicas."
                files={formData.psychometricTests}
                multiple={true}
                onFileSelect={(files) => setFormData(prev => ({ ...prev, psychometricTests: files as File[] }))}
              />

              <FileUpload
                label="Pruebas DISC del candidato"
                description="Agregue la prueba DISC o cualquier otra prueba de personalidad que ayude a profundizar en el análisis."
                files={formData.discTests}
                multiple={false}
                onFileSelect={(files) => setFormData(prev => ({ ...prev, discTests: files as File[] }))}
              />
              <FileUpload
                label="Prueba DISC del Supervisor (Opcional)"
                description="Resultados DISC del supervisor directo en formato PDF"
                files={formData.discSupervisorFile}
                multiple={false}
                onFileSelect={(file) => setFormData(prev => ({ ...prev, discSupervisorFile: file ? file : null }))}
              />
              <Button onClick={handleSubmit} className='bg-primary w-full'>Enviar</Button>
            </div>
          )}
          {currentStep === 2 && (
            <div className='flex flex-col gap-4 p-2'>
              <a target="_blank" className="text-center text-linkedin bg-linkedin hover:bg-linkedin/90 text-white py-2 px-6 rounded-xl transition-all duration-200 md:flex items-center justify-center" href={url ? url : "#"}>Haga clic aquí para ver el informe</a>
              {/*<Markdown>{content}</Markdown>*/}
            </div>
          )}
        </>}
      </CardContent>
    </Card>
  );
};