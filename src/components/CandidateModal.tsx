
import { X, Mail, Phone, MapPin, Calendar, FileText, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  experience: string;
  education: string;
  appliedDate: string;
  cvUrl?: string;
  skills: string[];
}

interface CandidateModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export function CandidateModal({ candidate, onClose }: CandidateModalProps) {
  const handleViewCV = () => {
    // Simular visualización de CV
    window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <div>{candidate.name}</div>
              <div className="text-sm text-muted-foreground font-normal">{candidate.position}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Información de Contacto */}
          <div className="form-section">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Información de Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">{candidate.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Teléfono</div>
                  <div className="font-medium">{candidate.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Ubicación</div>
                  <div className="font-medium">{candidate.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Fecha de Aplicación</div>
                  <div className="font-medium">{new Date(candidate.appliedDate).toLocaleDateString('es-MX')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Experiencia Laboral */}
          <div className="form-section">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Experiencia Laboral
            </h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-foreground">Experiencia Destacada</div>
                <p className="text-sm text-muted-foreground mt-1">{candidate.experience}</p>
              </div>
              
              {/* Simulamos experiencias adicionales */}
              <div className="space-y-3">
                <div className="border-l-2 border-primary-accent/30 pl-4">
                  <div className="font-medium">Desarrollador Frontend Senior</div>
                  <div className="text-sm text-muted-foreground">TechCorp (2021-2024)</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Desarrollo de aplicaciones web con React y TypeScript, liderazgo de equipo de 4 desarrolladores.
                  </p>
                </div>
                <div className="border-l-2 border-muted pl-4">
                  <div className="font-medium">Desarrollador Frontend</div>
                  <div className="text-sm text-muted-foreground">StartupXYZ (2019-2021)</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Creación de interfaces de usuario modernas y responsivas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Educación y Habilidades */}
          <div className="space-y-6">
            {/* Educación */}
            <div className="form-section">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Educación
              </h3>
              <div>
                <div className="font-medium text-foreground">{candidate.education.split(' - ')[0]}</div>
                <div className="text-sm text-muted-foreground">{candidate.education.split(' - ')[1]}</div>
                <div className="text-xs text-muted-foreground mt-1">2015-2019</div>
              </div>
            </div>

            {/* Habilidades */}
            <div className="form-section">
              <h3 className="text-lg font-semibold mb-4">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CV Section */}
        <div className="form-section mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Currículum Vitae
            </h3>
            <Button onClick={handleViewCV} className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Ver CV en PDF
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Haz clic en "Ver CV en PDF" para visualizar el documento completo del candidato.
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button>
            Avanzar a Siguiente Fase
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
