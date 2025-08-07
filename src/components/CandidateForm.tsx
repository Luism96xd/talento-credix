
import { useState } from 'react';
import { Upload, FileText, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  processId: string;
  experience: string;
  cv?: File;
}

const availableProcesses = [
  { id: 'dev-process', name: 'Proceso de Desarrolladores', description: 'Para posiciones de desarrollo de software' },
  { id: 'mgmt-process', name: 'Proceso Gerencial', description: 'Para posiciones de gerencia y liderazgo' },
  { id: 'admin-process', name: 'Proceso Administrativo', description: 'Para posiciones administrativas y operativas' }
];

export function CandidateForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    processId: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, cv: file }));
    } else {
      alert('Por favor, selecciona un archivo PDF válido.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.processId) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    console.log('Datos del candidato enviados:', formData);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="form-section text-center py-12">
          <CheckCircle className="w-16 h-16 text-secondary-accent mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            ¡Aplicación Enviada Exitosamente!
          </h2>
          <p className="text-muted-foreground mb-6">
            Gracias por tu interés en formar parte de Mayoreo. Hemos recibido tu aplicación y 
            será revisada por nuestro equipo de recursos humanos.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Te contactaremos pronto para informarte sobre el siguiente paso en el proceso de selección.
          </p>
          <Button 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                location: '',
                position: '',
                processId: '',
                experience: ''
              });
            }}
            variant="outline"
          >
            Enviar Nueva Aplicación
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Únete al Equipo Mayoreo
        </h1>
        <p className="text-lg text-muted-foreground">
          Completa el formulario para aplicar a una posición en nuestra empresa
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Personal */}
        <div className="form-section">
          <h3 className="text-xl font-semibold mb-6">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Apellidos *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Tus apellidos"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="tu.email@ejemplo.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+52 33 1234-5678"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Ciudad, Estado"
              />
            </div>
          </div>
        </div>

        {/* Información Laboral */}
        <div className="form-section">
          <h3 className="text-xl font-semibold mb-6">Información Laboral</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="position">Posición de Interés</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Ej. Desarrollador Frontend, Gerente de Marketing"
              />
            </div>
            
            <div>
              <Label htmlFor="processId">Proceso de Selección *</Label>
              <Select value={formData.processId} onValueChange={(value) => handleInputChange('processId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un proceso" />
                </SelectTrigger>
                <SelectContent>
                  {availableProcesses.map((process) => (
                    <SelectItem key={process.id} value={process.id}>
                      <div className="py-2">
                        <div className="font-medium">{process.name}</div>
                        <div className="text-sm text-muted-foreground">{process.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="experience">Experiencia Relevante</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="Describe tu experiencia laboral relevante para esta posición..."
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Subida de CV */}
        <div className="form-section">
          <h3 className="text-xl font-semibold mb-6">Currículum Vitae</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-primary-accent bg-primary/10' : 'border-border'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {formData.cv ? (
              <div className="space-y-4">
                <FileText className="w-12 h-12 text-secondary-accent mx-auto" />
                <div>
                  <p className="font-medium text-foreground">{formData.cv.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(formData.cv.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData(prev => ({ ...prev, cv: undefined }))}
                >
                  Cambiar Archivo
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-medium text-foreground mb-2">
                    Arrastra tu CV aquí o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Archivo PDF, máximo 10MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf';
                    input.onchange = (e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.files?.[0]) {
                        handleFileUpload(target.files[0]);
                      }
                    };
                    input.click();
                  }}
                >
                  Seleccionar Archivo
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Enviar */}
        <div className="form-section">
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                location: '',
                position: '',
                processId: '',
                experience: ''
              })}
            >
              Limpiar Formulario
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Aplicación
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
