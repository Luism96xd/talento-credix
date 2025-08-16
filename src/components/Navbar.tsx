
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Menu, Users, ClipboardCheck, Speech, FileText, Briefcase, SettingsIcon, StarIcon, Grid2X2Icon, FolderSearch, FileBoxIcon, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: FileText, label: 'Fases', path: '/fases' },
    { icon: Grid2X2Icon, label: 'Procesos', path: '/procesos' },
    { icon: Search, label: 'Buscador', path: '/search' },
    { icon: Briefcase, label: 'Requisición', path: '/requisicion' },
    { icon: FileBoxIcon, label: 'Repositorio', path: '/repositorio' },
    { icon: Map, label: 'Candidatos', path: '/candidates' },
    { icon: FolderSearch, label: 'Búsquedas', path: '/searches' },
    { icon: Users, label: 'Comparativos', path: '/candidate-analysis' },
    { icon: Speech, label: 'Guiones de entrevista', path: '/interview-scripts' },
    { icon: ClipboardCheck, label: 'Análisis de entrevista', path: '/interview-analysis' },
    //{ icon: SettingsIcon, label: 'Configuraciones', path: '/settings' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-16 hover:w-64 bg-white shadow-lg transition-all duration-300 z-50 group border-r">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600" />
            <span className="ml-3 font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Navegación
            </span>
          </div>
        </div>
        
        <div className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200",
                "hover:bg-gray-100 group/item",
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
