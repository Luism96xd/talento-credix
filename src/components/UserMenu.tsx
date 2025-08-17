
import React from 'react';
//import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión exitosamente.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo cerrar la sesión.',
        variant: 'destructive',
      });
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <User className="h-4 w-4" />
      <span>{user.email}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="ml-2"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserMenu;
