import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface CompanyIndicators {
  company_name: string
  vacantes_cerradas: number
  vacantes_abiertas: number
  operativo: number
  coordinacion: number
  jefatura: number
  gerencia: number
}

interface RecruiterIndicators {
  recruiter_name: string
  vacantes_cerradas: number
  vacantes_abiertas: number
  operativo: number
  coordinacion: number
  jefatura: number
  gerencia: number
}

interface InternIndicators {
  recruiter_name: string
  vacantes_abiertas: number
  vacantes_cerradas: number
}

export function useIndicators() {
  const [companyData, setCompanyData] = useState<CompanyIndicators[]>([])
  const [recruiterData, setRecruiterData] = useState<RecruiterIndicators[]>([])
  const [internData, setInternData] = useState<InternIndicators[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIndicators = async () => {
    try {
      setLoading(true)
      
      // Fetch all requisitions with company data
      const { data: requisitions, error: reqError } = await (supabase as any)
        .from('requisitions')
        .select(`
          *,
          companies(name)
        `)
        .eq('is_confidential', false)

      if (reqError) throw reqError

      // Process company indicators
      const companyMap = new Map<string, CompanyIndicators>()
      
      requisitions?.forEach((req: any) => {
        const companyName = req.companies?.name || 'Sin Empresa'
        const isOpen = req.status === 'open'
        const cargoType = req.cargo_type || 'operativo'
        
        if (!companyMap.has(companyName)) {
          companyMap.set(companyName, {
            company_name: companyName,
            vacantes_cerradas: 0,
            vacantes_abiertas: 0,
            operativo: 0,
            coordinacion: 0,
            jefatura: 0,
            gerencia: 0
          })
        }
        
        const company = companyMap.get(companyName)!
        
        if (isOpen) {
          company.vacantes_abiertas++
          switch (cargoType.toLowerCase()) {
            case 'operativo':
              company.operativo++
              break
            case 'coordinación':
              company.coordinacion++
              break
            case 'jefatura':
              company.jefatura++
              break
            case 'gerencia':
              company.gerencia++
              break
          }
        } else {
          company.vacantes_cerradas++
        }
      })

      setCompanyData(Array.from(companyMap.values()))

      // Process recruiter indicators (using assigned_to field)
      const recruiterMap = new Map<string, RecruiterIndicators>()
      
      requisitions?.forEach((req: any) => {
        const recruiterName = req.assigned_to || 'Por asignar'
        const isOpen = req.status === 'open'
        const cargoType = req.cargo_type || 'operativo'
        
        if (!recruiterMap.has(recruiterName)) {
          recruiterMap.set(recruiterName, {
            recruiter_name: recruiterName,
            vacantes_cerradas: 0,
            vacantes_abiertas: 0,
            operativo: 0,
            coordinacion: 0,
            jefatura: 0,
            gerencia: 0
          })
        }
        
        const recruiter = recruiterMap.get(recruiterName)!
        
        if (isOpen) {
          recruiter.vacantes_abiertas++
          switch (cargoType.toLowerCase()) {
            case 'operativo':
              recruiter.operativo++
              break
            case 'coordinación':
              recruiter.coordinacion++
              break
            case 'jefatura':
              recruiter.jefatura++
              break
            case 'gerencia':
              recruiter.gerencia++
              break
          }
        } else {
          recruiter.vacantes_cerradas++
        }
      })

      setRecruiterData(Array.from(recruiterMap.values()))

      // Process intern indicators (filter by requisition_type = 'pasante')
      const internMap = new Map<string, InternIndicators>()
      
      requisitions?.filter((req: any) => req.requisition_type ==='pasante')
        .forEach((req: any) => {
          const recruiterName = req.assigned_to || 'Por asignar'
          const isOpen = req.status === 'open'
          
          if (!internMap.has(recruiterName)) {
            internMap.set(recruiterName, {
              recruiter_name: recruiterName,
              vacantes_abiertas: 0,
              vacantes_cerradas: 0
            })
          }
          
          const intern = internMap.get(recruiterName)!
          
          if (isOpen) {
            intern.vacantes_abiertas++
          } else {
            intern.vacantes_cerradas++
          }
        })

      setInternData(Array.from(internMap.values()))

    } catch (error) {
      console.error('Error fetching indicators:', error)
      setError('Error al cargar los indicadores')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIndicators()
  }, [])

  return {
    companyData,
    recruiterData,
    internData,
    loading,
    error,
    refetch: fetchIndicators
  }
}