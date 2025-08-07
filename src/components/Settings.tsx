
import { Settings as SettingsIcon, Building2, Users, Mail } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuraciones</h1>
        <p className="text-muted-foreground">Configuraciones generales del sistema</p>
      </div>

      <div className="grid gap-6">
        <div className="form-section">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-primary-accent" />
            <h3 className="text-lg font-semibold">Información de la Empresa</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Empresa</div>
              <div className="font-medium">Mayoreo S.A. de C.V.</div>
            </div>
            <div>
              <div className="text-muted-foreground">Ubicación</div>
              <div className="font-medium">Guadalajara, Jalisco, México</div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-primary-accent" />
            <h3 className="text-lg font-semibold">Estadísticas del Sistema</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary-accent">24</div>
              <div className="text-sm text-muted-foreground">Candidatos Activos</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-lg">
              <div className="text-2xl font-bold text-secondary-accent">6</div>
              <div className="text-sm text-muted-foreground">Fases Configuradas</div>
            </div>
            <div className="text-center p-4 bg-action/20 rounded-lg">
              <div className="text-2xl font-bold text-action-foreground">3</div>
              <div className="text-sm text-muted-foreground">Procesos Activos</div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-primary-accent" />
            <h3 className="text-lg font-semibold">Configuraciones de Notificaciones</h3>
          </div>
          <p className="text-muted-foreground">
            Las configuraciones de notificaciones por email y otras preferencias del sistema 
            estarán disponibles en futuras versiones del ATS.
          </p>
        </div>
      </div>
    </div>
  );
}
