import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordModal({ open, onOpenChange }: ChangePasswordModalProps) {
  const { changePassword, isPasswordRecovery, setIsPasswordRecovery } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast({
        title: 'Contraseña muy corta',
        description: 'La contraseña debe tener al menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await changePassword(newPassword);

      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'Error al actualizar la contraseña',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Éxito',
        description: 'Contraseña actualizada exitosamente',
      });
      
      setNewPassword('');
      setConfirmPassword('');
      if (isPasswordRecovery) {
        setIsPasswordRecovery(false);
      }
      onOpenChange(false);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: 'Error inesperado al cambiar la contraseña',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpenState: boolean) => {
    if (isPasswordRecovery && !newOpenState) {
      return; // Do nothing, keep it open if recovery
    }
    onOpenChange(newOpenState);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => {
        if (isPasswordRecovery) e.preventDefault();
      }}>
        <DialogHeader>
          <DialogTitle>{isPasswordRecovery ? 'Restablecer Contraseña' : 'Cambiar Contraseña'}</DialogTitle>
          <DialogDescription>
            {isPasswordRecovery 
              ? 'Por favor, ingresa tu nueva contraseña para continuar usando la aplicación.'
              : 'Ingresa tu nueva contraseña para actualizar tu acceso.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nueva Contraseña</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Vuelve a escribir la contraseña"
              required
              minLength={6}
            />
          </div>

          <DialogFooter className="pt-4">
            {!isPasswordRecovery && (
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Contraseña
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
