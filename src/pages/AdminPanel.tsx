
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationManagement from '@/components/notifications/NotificationManagement';
import { useToast } from '@/hooks/use-toast';
import RecruiterAssignmentPage from '@/components/recruiters/RecruiterAssignmentPage';
import { NotificationConfig } from '@/types';
import { useProfiles } from '@/hooks/useProfiles';
import UserManagement from '@/components/admin/UserManagement';

interface UserData {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  roles: string[];
  created_at: string;
}


export default function AdminPanel() {
  const { hasRole } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [notifications, setNotifications] = useState<NotificationConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [phases, setPhases] = useState([])
  const {assignments, fetchAssignments} = useProfiles()
  const { toast } = useToast()

  const fetchUsers = async () => {
    try {
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('*, user_roles!inner(role)')
        .in('user_roles.role', ['responsable_comercial']);

      if (usersError) throw usersError;

      const usersWithRoles = await Promise.all(
        users.map(async (user: any) => {
          return {
            ...user,
            roles: user.user_roles.map((r: any) => r.role) ?? []
          };
        })
      );
      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: 'Error al cargar usuarios',
        variant: 'destructive'
      });
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

  if (!hasRole('admin')) {
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
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
        </div>

        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="assignments">Asignaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement users={users} onUsersChange={fetchUsers} />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationManagement notifications={notifications} phases={phases} onNotificationsChange={fetchNotifications} />
          </TabsContent>
          <TabsContent value="assignments">
            <RecruiterAssignmentPage assignments={assignments} onAssignmentsChange={fetchAssignments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
