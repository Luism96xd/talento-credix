import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Recruiter, RecruiterAssignment, UserProfile } from '@/types'


export function useProfiles() {
    const [recruiters, setRecruiters] = useState<UserProfile[]>([])
    const [assignments, eetAssignments] = useState<RecruiterAssignment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchRecruiters = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*, user_roles!inner(role)')
                .in('user_roles.role', ['reclutador'])
                .eq('is_active', true)
                .order('full_name', { ascending: true })

            if (error) throw error
            setRecruiters(data || [])
        } catch (error) {
            console.error('Error fetching recruiters:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('recruiter_assignments')
                .select('*, company:companies(name), country:countries(name), recruiter:profiles(full_name), department:departments(name), position:positions(name)')
                .eq('is_active', true)
                .order('created_at', { ascending: true })

            if (error) throw error
            eetAssignments(data || [])
        } catch (error) {
            console.error('Error fetching recruiters:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchRecruiters()
        fetchAssignments()
    }, [])

    return {
        recruiters,
        assignments,
        loading,
        error,
        fetchRecruiters,
        fetchAssignments
    }
}