
import React from 'react';
import { User, LogOut, Users, ClipboardCheck, Speech, FolderSearch, Search, Briefcase, Home, KeyRound } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export const Navbar = () => {
  const { user, hasPermission } = useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/auth');
    }
  };

  // Define navigation items based on roles
  const getNavigationItems = () => {
    const items = [];

    if (hasPermission('home', 'read')) {
      items.push({ label: "Inicio", href: "/", icon: Home, module: "home" });
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
    return items;
  };
  const navigation = getNavigationItems();


  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img className='h-16' src="/Credix_Logo.png" alt="Credix" />
          </Link>
          {/*<h1 className="text-xl font-bold items-center text-gray-800">Automatizaciones de Personal</h1>*/}
          <div className='flex-2 gap-8 items-start'>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 mx-2 border-b-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-slate-100 rounded-lg px-2 py-1.5 h-auto">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
                    {user.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Mi Perfil</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile-security')} className="cursor-pointer">
                  <KeyRound className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>Cambiar contraseña</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
};
