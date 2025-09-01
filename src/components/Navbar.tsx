
import React from 'react';
import { User, LogOut, Users, ClipboardCheck, Speech, FolderSearch, Search, Briefcase, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';


export const Navbar = () => {
  const { user, hasPermission } = useAuth()
  const navigate = useNavigate();

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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user.email}
              </span>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="border-gray-200 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
