import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface Country {
  id: string
  name: string
  code: string
}

interface Company {
  id: string
  name: string
  country_id: string
}

interface Department {
  id: string
  name: string
  company_id: string
}

interface Position {
  id: string
  name: string
  department_id: string
}

interface PositionLevel {
  id: string
  position_id: string
  level: string
  step: string
}

export function useRequisitionData() {
  const [countries, setCountries] = useState<Country[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [positionLevels, setPositionLevels] = useState<PositionLevel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setCountries(data || [])
    } catch (error) {
      console.error('Error fetching countries:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCompaniesByCountry = async (countryId: string) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('country_id', countryId)
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setCompanies(data || [])
    } catch (error) {
      console.error('Error fetching companies:', error)
    }
  }

  const fetchDepartmentsByCompany = async (companyId: string) => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('company_id', companyId)
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setDepartments(data || [])
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }

  const fetchPositionsByDepartment = async (departmentId: string) => {
    try {
      const { data, error } = await supabase
        .from('positions')
        .select('*')
        .eq('department_id', departmentId)
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setPositions(data || [])
    } catch (error) {
      console.error('Error fetching positions:', error)
    }
  }

  const fetchLevelsByPosition = async (positionId: string) => {
    try {
      const { data, error } = await supabase
        .from('position_levels')
        .select('*')
        .eq('position_id', positionId)
        .eq('is_active', true)
        .order('level', { ascending: true })

      if (error) throw error
      setPositionLevels(data || [])
    } catch (error) {
      console.error('Error fetching position levels:', error)
    }
  }

  const submitRequisition = async (formData: any) => {
    try {
      const { data, error } = await supabase
        .from('personnel_requisitions')
        .insert({
          form_data: formData,
          status: 'submitted'
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error submitting requisition:', error)
      throw error
    }
  }

  return {
    countries,
    companies,
    departments,
    positions,
    positionLevels,
    loading,
    fetchCompaniesByCountry,
    fetchDepartmentsByCompany,
    fetchPositionsByDepartment,
    fetchLevelsByPosition,
    submitRequisition
  }
}