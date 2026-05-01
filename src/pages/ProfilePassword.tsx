import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, KeyRound, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { changePassword } = useAuth();
  const navigate = useNavigate();
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
      
      // Optionally redirect or stay on page
      // navigate('/');
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

  return (
    <div className="container mx-auto py-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          Seguridad de la Cuenta
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Gestiona tu contraseña y mantén tu cuenta segura.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Cambiar Contraseña
            </CardTitle>
            <CardDescription>
              Asegúrate de usar una contraseña fuerte y no compartirla.
            </CardDescription>
          </CardHeader>
          <CardContent>
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

              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Actualizar Contraseña
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="bg-slate-50 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recomendaciones de Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <ul className="list-disc pl-4 space-y-2">
                <li>Usa al menos 8 caracteres para mayor seguridad.</li>
                <li>Combina letras mayúsculas, minúsculas, números y símbolos.</li>
                <li>No uses contraseñas que ya hayas utilizado en otros sitios web.</li>
                <li>Evita usar información personal obvia como tu nombre o fecha de nacimiento.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
