import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Send, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { InvitationData } from '@/types';

interface InvitationModalProps {
  onSendInvitations: (invitations: InvitationData[]) => Promise<void>;
}

const InvitationModal = ({ onSendInvitations}: InvitationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [invitations, setInvitations] = useState<InvitationData[]>([
    { name: '', email: '', phone: '' }
  ]);
  const [invitationType, setInvitationType] = useState<'email' | 'whatsapp'>('email');
  const [isLoading, setIsLoading] = useState(false);

  const addRow = () => {
    setInvitations([...invitations, { name: '', email: '', phone: '' }]);
  };

  const removeRow = (index: number) => {
    if (invitations.length > 1) {
      setInvitations(invitations.filter((_, i) => i !== index));
    }
  };

  const updateInvitation = (index: number, field: keyof InvitationData, value: string) => {
    const updated = [...invitations];
    updated[index] = { ...updated[index], [field]: value };
    setInvitations(updated);
  };

  const validateInvitations = () => {
    const validInvitations = invitations.filter(inv => {
      if (!inv.name.trim()) return false;
      if (invitationType === 'email') {
        return inv.email && inv.email.includes('@');
      } else {
        return inv.phone && inv.phone.trim();
      }
    });

    if (validInvitations.length === 0) {
      toast.error('Agrega al menos una invitación válida');
      return [];
    }

    return validInvitations;
  };

  const handleSendInvitations = async () => {
    const validInvitations = validateInvitations();
    if (validInvitations.length === 0) return;

    setIsLoading(true);
    try {
      await onSendInvitations(validInvitations);
      toast.success(`${validInvitations.length} invitaciones enviadas exitosamente`);
      // Reset form
      setInvitations([{ name: '', email: '', phone: '' }]);
      setIsOpen(false);
    } catch (error) {
      toast.error('Error al enviar invitaciones');
      console.error('Error sending invitations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linkedin hover:bg-linkedin-hover text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
          <Send className="h-4 w-4 mr-2" />
          Enviar Invitaciones
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Enviar Invitaciones
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invitation Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tipo de Invitación</CardTitle>
              <CardDescription>
                Selecciona cómo quieres enviar las invitaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={invitationType} onValueChange={(value: 'email' | 'whatsapp') => setInvitationType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Correo Electrónico
                    </div>
                  </SelectItem>
                  <SelectItem value="whatsapp">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Invitations Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lista de Invitados</CardTitle>
              <CardDescription>
                Agrega los datos de las personas que quieres invitar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre Completo</TableHead>
                      {invitationType === 'email' ? (
                        <TableHead>Correo Electrónico</TableHead>
                      ) : (
                        <TableHead>Teléfono</TableHead>
                      )}
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invitations.map((invitation, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input
                            placeholder="Nombre completo"
                            value={invitation.name}
                            onChange={(e) => updateInvitation(index, 'name', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          {invitationType === 'email' ? (
                            <Input
                              type="email"
                              placeholder="correo@ejemplo.com"
                              value={invitation.email || ''}
                              onChange={(e) => updateInvitation(index, 'email', e.target.value)}
                            />
                          ) : (
                            <Input
                              type="tel"
                              placeholder="+34 600 123 456"
                              value={invitation.phone || ''}
                              onChange={(e) => updateInvitation(index, 'phone', e.target.value)}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRow(index)}
                            disabled={invitations.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button
                variant="outline"
                onClick={addRow}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Fila
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSendInvitations}
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar Invitaciones'}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationModal;