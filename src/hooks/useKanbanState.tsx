import { useState, useEffect } from 'react';
import { KanbanState, Candidate, NotificationConfig, InvitationData, UserProfile } from '@/types';
import { supabase } from '@/integrations/supabase/client';

export function useKanbanState() {
  const [state, setState] = useState<KanbanState>({
    phases: [],
    candidates: [],
    processes: [],
    notifications: [],
    process: null,
  });

  // Load from localStorage on mount
  useEffect(() => {
    fetchPhases()
    fetchProcesses();
    fetchNotifications();
    const saved = localStorage.getItem('kanban-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        parsed.candidates = parsed.candidates.map((c: any) => ({
          ...c,
          appliedAt: new Date(c.appliedAt),
          lastUpdated: new Date(c.lastUpdated),
        }));
        parsed.notifications = parsed.notifications.map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt),
        }));
        setState({ ...state, ...parsed });
      } catch (error) {
        console.error('Error loading kanban state:', error);
      }
    }
  }, []);

  const fetchCandidates = async (requisitionId: string) => {
    try {
      const { data, error } = await supabase
        .from('selected_candidates')
        .select('*,requisition:requisitions(*, positions(name))')
        .eq('requisition_id', requisitionId)

      if (error) throw error
      setState(prev => ({
        ...prev,
        candidates: data
      }));
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')

      if (error) throw error
      setState(prev => ({
        ...prev,
        notifications: data
      }));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchPhases = async () => {
    try {
      const { data, error } = await supabase
        .from('phases')
        .select('*')
        .order('order', { ascending: true })

      if (error) throw error;
      setState(prev => ({
        ...prev,
        phases: data
      }));
    } catch (error) {
      console.error('Error fetching phases:', error);
    }
  };

  const fetchProcesses = async () => {
    try {
      const { data, error } = await supabase
        .from('requisitions')
        .select('*, positions(name), department:departments(name)')
        .eq('status', 'open')

        .order('created_at', { ascending: false });
      if (error) throw error;
      setState(prev => ({
        ...prev,
        processes: data || []
      }));
      //setRequisition(data.filter(r => r.id === processId)[0])
    } catch (error) {
      console.error('Error fetching requisitions:', error);
    }
  };

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('kanban-state', JSON.stringify(state));
  }, [state]);

  const moveCandidateToPhase = async (candidateId: string, from_phase_id: string, to_phase_id: string) => {
    try {
      setState(prev => ({
        ...prev,
        candidates: prev.candidates.map(candidate =>
          candidate.id === candidateId
            ? { ...candidate, current_phase_id: to_phase_id, lastUpdated: new Date() }
            : candidate
        ),
      }));
      const { error } = await supabase
        .from('selected_candidates')
        .update({ current_phase_id: to_phase_id })
        .eq('id', candidateId)
      if (error) throw error
    } catch (error) {
      console.log(error)
    }

  };

  const addCandidates = async (newCandidates: Candidate[]) => {
    try {
      const { error } = await supabase.from('selected_candidates').insert(newCandidates)
      if (error) throw error

      setState(prev => ({
        ...prev,
        candidates: [...prev.candidates, ...newCandidates],
      }));
    } catch (error) {
      console.log(error)
    }
  };

  const saveNotification = (notification: NotificationConfig) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.some(n => n.id === notification.id)
        ? prev.notifications.map(n => n.id === notification.id ? notification : n)
        : [...prev.notifications, notification],
    }));
  };

  const deleteNotification = (id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id),
    }));
  };

  const toggleNotification = (id: string, enabled: boolean) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n =>
        n.id === id ? { ...n, enabled } : n
      ),
    }));
  };

  const sendInvitations = async (invitations: InvitationData[], processId: string) => {
    const webhookUrl = "https://n8n.mayoreo.biz/webhook/0fa77f1a-9293-4e29-98d3-cb09521e14aa"
    // Send webhook request if URL is provided
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'invitations',
            invitations,
            requisition: {
              id:processId
            },
            toPhase: {
              order: 0,
              name: 'invita'
            },
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('Error sending webhook:', error);
      }
    }

    const invitationPhase = state.phases.find(r => r.order === 0).id;

    // Add candidates to the "Invitación" phase
    const newCandidates = invitations.filter(inv => inv.email && inv.name).map(invitation => ({
      id: crypto.randomUUID(),
      name: invitation.name,
      email: invitation.email!,
      phone: invitation.phone,
      requisition_id: null,
      status: "active",
      current_phase_id: invitationPhase,
      skills: [],
      experience: 'Por determinar',
      created_at: new Date(),
      updated_at: new Date(),
    }));

    setState(prev => ({
      ...prev,
      candidates: [...prev.candidates, ...newCandidates],
    }));

    return newCandidates;
  };

  return {
    ...state,
    moveCandidateToPhase,
    fetchCandidates,
    addCandidates,
    saveNotification,
    deleteNotification,
    toggleNotification,
    sendInvitations,
  };
}