import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Requisition } from '@/types'


export function useRequisitions(filters: any = {}) {
  const [requisitions, setRequisitions] = useState<Requisition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRequisitions = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('requisitions')
        .select(`
          *,
          countries(name),
          companies(name),
          departments(name),
          positions(name)
        `)

      // Apply filters
      if (filters.country && filters.country !== 'all') {
        query = query.eq('country_id', filters.country)
      }
      if (filters.company && filters.company !== 'all') {
        query = query.eq('company_id', filters.company)
      }
      if (filters.cargoType && filters.cargoType !== 'all') {
        query = query.eq('cargo_type', filters.cargoType)
      }
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }
      if (filters.period && filters.period !== 'all') {
        const [year, month] = filters.period.split('-')
        query = query.gte('created_at', `${year}-${month}-01`)
        query = query.lt('created_at', `${year}-${month.padStart(2, '0')}-31`)
      }

      // Only show public requisitions
      query = query.eq('is_confidential', false)

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error

      // Transform data to include related names
      const transformedData = data?.map((item: any) => ({
        ...item,
        country_name: item.countries?.name,
        company_name: item.companies?.name,
        department_name: item.departments?.name,
        position_name: item.positions?.name,
        assigned_to: 'Por asignar' // TODO: Add assigned_to field to database
      })) || []

      setRequisitions(transformedData)
    } catch (error) {
      console.error('Error fetching requisitions:', error)
      setError('Error al cargar las solicitudes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequisitions()
  }, [filters])

  return {
    requisitions,
    loading,
    error,
    refetch: fetchRequisitions
  }
}