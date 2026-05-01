
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationManagement from '@/components/notifications/NotificationManagement';
import { useToast } from '@/hooks/use-toast';
import RecruiterAssignmentPage from '@/components/recruiters/RecruiterAssignmentPage';
import { NotificationConfig } from '@/types';
import { useProfiles } from '@/hooks/useProfiles';
import UserManagement, { UserRow } from '@/components/admin/UserManagement';


export default function AdminPanel() {
  const { hasPermission, hasRole } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [notifications, setNotifications] = useState<NotificationConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [phases, setPhases] = useState([])
  const { assignments, fetchAssignments } = useProfiles()
  const { toast } = useToast()

  const fetchUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, phone, created_at, is_active, user_roles(role, is_active)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const shaped: UserRow[] = (profiles ?? []).map((p: any) => ({
        id: p.id,
        email: p.email,
        full_name: p.full_name,
        phone: p.phone,
        created_at: p.created_at,
        is_active: p.is_active,
        roles: (p.user_roles ?? []).map((r: any) => ({ role: r.role, is_active: r.is_active ?? false })),
      }));

      setUsers(shaped);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({ title: 'Error', description: 'Error al cargar usuarios', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };
  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')

      if (error) throw error;
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch notifications",
        variant: "destructive"
      });
    }
  };
  const fetchPhases = async () => {
    try {
      const { data, error } = await supabase
        .from('phases')
        .select('*')

      if (error) throw error;
      setPhases(data);
    } catch (error) {
      console.error('Error fetching phases:', error);
      toast({
        title: "Error",
        description: "Failed to fetch phases",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPhases()
    fetchNotifications();
    fetchUsers();
  }, []);

  if (!hasRole('admin') || !hasPermission('settings', 'read')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground">Solo los administradores pueden acceder a este panel.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Panel de Administración</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Gestiona configuraciones globales, accesos de usuarios y notificaciones del sistema.
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-slate-100/80 p-1 border">
          <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2">
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2">
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="assignments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2">
            Asignaciones
          </TabsTrigger>
          <TabsTrigger value="google" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2">
            Configuración Google
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="focus-visible:outline-none focus-visible:ring-0">
          <UserManagement users={users} onUsersChange={fetchUsers} />
        </TabsContent>

        <TabsContent value="notifications" className="focus-visible:outline-none focus-visible:ring-0 mt-6">
          <NotificationManagement notifications={notifications} phases={phases} onNotificationsChange={fetchNotifications} />
        </TabsContent>

        <TabsContent value="assignments" className="focus-visible:outline-none focus-visible:ring-0 mt-6">
          <RecruiterAssignmentPage assignments={assignments} onAssignmentsChange={fetchAssignments} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
