import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from './FileUpload';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Markdown from 'react-markdown'
import { Loader } from 'lucide-react';

const WEBHOOK_URL = 'https://n8n.mayoreo.biz/webhook/477cd5ca-aa5e-41d9-bf96-4dcd554a9833';

export const CandidateAnalysisForm: React.FC = () => {
  const [taskId, setTaskId] = useState(null);
  const [url, setUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cvFiles: [] as File[],
    psychometricTests: [] as File[],
    jobDescriptionFile: [] as File[] | null,
    additionalContext: '',
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

    if (!formData.jobDescriptionFile || formData.jobDescriptionFile.length === 0) {
      toast({
        title: 'Archivo Faltante',
        description: 'Por favor, carga la descripción del cargo.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.additionalContext.trim() === '') {
      toast({
        title: 'Contexto Faltante',
        description: 'Por favor, proporciona contexto adicional para la posición.',
        variant: 'destructive',
      });
      return;
    }

    const taskId = generateTaskId();
    const data = new FormData();
    await supabase.from('task_progress').insert({
      task_id: taskId,
      step: 0,
      status: "processing"
    })
    setTaskId(taskId);

    // Append all text fields
    data.append('taskId', taskId);
    data.append('additionalContext', formData.additionalContext);

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
          Carga los CVs de los candidatos, sus pruebas psicotécnicas y otra información que ayude a profundizar en el análisis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
          <div className="mt-12 text-center animate-fade-in">
            <div className="mb-4 flex justify-center">
              <Loader className="h-12 w-12 text-linkedin animate-spin" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Analizando candidatos</h3>
            <p className="text-gray-500 mb-6">Generando análisis multicriterio de los candidatos</p>
          </div>
        )}
        {!isLoading && <>
          {currentStep === 1 && (
            <div className='flex flex-col gap-2'>
              <FileUpload
                label="CVs de los candidatos"
                description="Curriculum vitae en formato PDF. Subir múltiples archivos."
                files={formData.cvFiles}
                multiple={true}
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
                label="Pruebas psicotécnicas"
                description="Resultados de pruebas psicotécnicas. Subir múltiples archivos."
                files={formData.psychometricTests}
                multiple={true}
                onFileSelect={(files) => setFormData(prev => ({ ...prev, psychometricTests: files as File[] }))}
              />

              <div className='space-y-2'>
                <label className="text-sm font-medium text-gray-700">Contexto de la posición</label>
                <p className="text-xs text-gray-500">Escriba detalles adicionales sobre el cargo y el entorno</p>
                <Textarea
                  aria-label='Contexto de la posición'
                  rows={5}
                  placeholder='Sea detallado para mejorar la calidad de los resultados'
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalContext: e.target.value }))}
                  value={formData.additionalContext}
                />
              </div>
              <FileUpload
                label="Pruebas DISC de los candidatos"
                description="Agregue la pruebas DISC o cualquier otra prueba de personalidad que ayude a profundizar en el análisis. Subir múltiples archivos."
                files={formData.discTests}
                multiple={true}
                onFileSelect={(files) => setFormData(prev => ({ ...prev, discTests: files as File[] }))}
              />
              <FileUpload
                label="Prueba DISC del Supervisor (Opcional)"
                description="Resultados DISC del supervisor directo en formato PDF"
                files={formData.discSupervisorFile}
                multiple={false}
                onFileSelect={(file) => setFormData(prev => ({ ...prev, discSupervisorFile: file ? file : null }))}
              />
              <Button onClick={handleSubmit} className='w-full'>Enviar</Button>
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