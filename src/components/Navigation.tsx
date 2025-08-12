
import { Users, Settings as SettingsIcon, FileText, Briefcase, UserPlus, BarChart3 } from 'lucide-react';
import type { ViewType } from '@/pages/Search';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const menuItems = [
    {
      id: 'kanban' as ViewType,
      label: 'Tablero Kanban',
      icon: BarChart3,
      description: 'Vista del proceso de selección'
    },
    {
      id: 'form' as ViewType,
      label: 'Formulario Candidatos',
      icon: UserPlus,
      description: 'Registro de nuevos candidatos'
    },
    {
      id: 'phases' as ViewType,
      label: 'Fases',
      icon: FileText,
      description: 'Gestionar fases del proceso'
    },
    {
      id: 'processes' as ViewType,
      label: 'Procesos',
      icon: Briefcase,
      description: 'Configurar procesos de selección'
    },
    {
      id: 'settings' as ViewType,
      label: 'Configuraciones',
      icon: SettingsIcon,
      description: 'Configuraciones del sistema'
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary-accent rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Mayoreo ATS</h1>
            <p className="text-sm text-muted-foreground">Sistema de Selección</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`nav-link w-full text-left ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="text-center text-xs text-muted-foreground">
          © 2024 Mayoreo
        </div>
      </div>
    </aside>
  );
}
