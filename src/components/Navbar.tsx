
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Menu, Users, ClipboardCheck, Speech, FileText, Briefcase, SettingsIcon, StarIcon, Grid2X2Icon, FolderSearch, FileBoxIcon, Map, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { profile, signOut, hasPermission, hasRole } = useAuth();

  // Define navigation items based on roles
  const getNavigationItems = () => {
    const items = [];

    if (hasPermission('home', 'read')) {
      items.push({ label: "Inicio", href: "/", icon: Home, module: "home" });
    }
    // Indicadores - solo para directores y admins
    if (hasPermission('dashboard','read') || hasRole('reclutador')) {
      items.push({ label: "Indicadores", href: "/dashboard", icon: LayoutDashboard, module: "dashboard" });
    }
    if (hasRole("admin")) {
      items.push({ label: "Fases", href: "/phases", icon: Grid2X2Icon, module: "phases" });
    }
    if (hasRole("admin")) {
      items.push({ label: "Vacantes", href: "/processes", icon: FileText, module: "processes" });
    }
    if (hasPermission("requisicion", "read") || hasPermission("requisicion", "write")) {
      items.push({ label: "Requisición", href: "/requisicion", icon: Briefcase, module: "requisicion" });
    }
    if (hasRole('reclutador') && (hasPermission("repositorio", "read") || hasPermission("repositorio", "write"))) {
      items.push({ label: "Repositorio", href: "/repositorio", icon: FolderSearch, module: "repositorio" });
    }
    if (hasRole('reclutador') && (hasPermission("candidates", "read") || hasPermission("candidates", "write"))) {
      items.push({ label: "Candidatos", href: "/candidates", icon: Map, module: "candidates" });
    }
    if (hasPermission("buscador", "read") || hasPermission("buscador", "write")) {
      items.push({ label: "Buscador", href: "/search", icon: Search, module: "buscador" });
    }
    if (hasPermission("busquedas", "read") || hasPermission("busquedas", "write")) {
      items.push({ label: "Búsquedas", href: "/searches", icon: FolderSearch, module: "busquedas" });
    }
    if (hasPermission("comparativos", "read") || hasPermission("comparativos", "write")) {
      items.push({ label: "Comparativos", href: "/candidate-analysis", icon: Users, module: "comparativos" });
    }
    if (hasPermission("guiones", "read") || hasPermission("guiones", "write")) {
      items.push({ label: "Guiones de entrevista", href: "/interview-scripts", icon: Speech, module: "guiones" });
    }
    if (hasPermission("entrevistas", "read") || hasPermission("entrevistas", "write")) {
      items.push({ label: "Análisis de entrevista", href: "/interview-analysis", icon: ClipboardCheck, module: "entrevistas" });
    }
    // Indicadores - solo para directores y admins
    if (hasRole('admin')) {
      items.push({ label: "Configuraciones", href: "/settings", icon: SettingsIcon, module: "settings" });
    }
    return items;
  };

  const navItems = getNavigationItems();

  /*const navItems = [
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
*/
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
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200",
                "hover:bg-gray-100 group/item",
                location.pathname === item.href
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
