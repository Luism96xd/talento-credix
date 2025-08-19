import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { CompanyIndicators, InternIndicators, ProcessingStats, RecruiterIndicators } from '@/types'


export function useIndicators() {
  const [companyData, setCompanyData] = useState<CompanyIndicators[]>([])
  const [recruiterData, setRecruiterData] = useState<RecruiterIndicators[]>([])
  const [internData, setInternData] = useState<InternIndicators[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIndicators = async () => {
    try {
      setLoading(true)
      setError(null)

      // --- 1. Obtener todos los datos necesarios en paralelo ---
      const currentYear = new Date().getFullYear()

      const requisitionsPromise = supabase
        .from('requisitions')
        .select(`*, companies(name)`)
        .eq('is_confidential', false)

      const companiesPromise = supabase.from('companies').select('name')

      // Asegúrate de que el nombre de la columna 'full_name' sea el correcto en tu tabla 'profiles'
      const recruitersPromise = supabase
        .from('profiles')
        .select('full_name, user_roles!inner(role)')
        .in('user_roles.role', ['reclutador'])

      const [
        { data: requisitions, error: reqError },
        { data: allCompanies, error: compError },
        { data: allRecruiters, error: recError },
      ] = await Promise.all([requisitionsPromise, companiesPromise, recruitersPromise])

      if (reqError) throw reqError
      if (compError) throw compError
      if (recError) throw recError

      // --- 2. Preparar los mapas con un array para guardar los tiempos de cierre ---
      const companyMap = new Map<string, CompanyIndicators & ProcessingStats>()
      allCompanies?.forEach(comp => {
        companyMap.set(comp.name, {
          company_name: comp.name,
          vacantes_cerradas: 0, vacantes_abiertas: 0, operativo: 0, coordinacion: 0, jefatura: 0, gerencia: 0,
          avgClosingTime: null, minClosingTime: null, maxClosingTime: null,
          closingTimes: [] // <-- Array temporal para los cálculos
        })
      })

      const recruiterMap = new Map<string, RecruiterIndicators & ProcessingStats>()
      allRecruiters?.forEach(rec => {
        const recruiterName = rec.full_name || 'Nombre no disponible'
        recruiterMap.set(recruiterName, {
          recruiter_name: recruiterName,
          vacantes_cerradas: 0, vacantes_abiertas: 0, operativo: 0, coordinacion: 0, jefatura: 0, gerencia: 0,
          avgClosingTime: null, minClosingTime: null, maxClosingTime: null,
          closingTimes: [] // <-- Array temporal para los cálculos
        })
      })

      const internMap = new Map<string, InternIndicators>()

      // --- 3. Procesar las requisiciones para rellenar los contadores ---
      requisitions?.forEach((req: any) => {
        const companyName = req.companies?.name || 'Sin Empresa'
        const recruiterName = req.assigned_to || 'Por asignar'
        const isOpen = req.status === 'open'
        const cargoType = (req.cargo_type || 'operativo').toLowerCase()

        // Procesar Compañías
        if (companyMap.has(companyName)) {
          const company = companyMap.get(companyName)!
          if (isOpen) {
            company.vacantes_abiertas++
            if (cargoType === 'operativo') company.operativo++
            else if (cargoType === 'coordinación') company.coordinacion++
            else if (cargoType === 'jefatura') company.jefatura++
            else if (cargoType === 'gerencia') company.gerencia++
          } else {
            company.vacantes_cerradas++
          }
        }

        // Procesar Reclutadores
        if (recruiterMap.has(recruiterName)) {
          const recruiter = recruiterMap.get(recruiterName)!
          if (isOpen) {
            recruiter.vacantes_abiertas++
            if (cargoType === 'operativo') recruiter.operativo++
            else if (cargoType === 'coordinación') recruiter.coordinacion++
            else if (cargoType === 'jefatura') recruiter.jefatura++
            else if (cargoType === 'gerencia') recruiter.gerencia++
          } else {
            recruiter.vacantes_cerradas++
          }
        }

        if (!isOpen && req.created_at && req.closed_date
          && new Date(req.closed_date).getFullYear() === currentYear) {
          const startDate = new Date(req.created_at).getTime()
          const endDate = new Date(req.closed_date).getTime()
          const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24)

          if (companyMap.has(companyName)) {
            companyMap.get(companyName)!.closingTimes.push(diffInDays)
          }
          if (recruiterMap.has(recruiterName)) {
            recruiterMap.get(recruiterName)!.closingTimes.push(diffInDays)
          }
        }

        // Procesar Pasantes (Interns)
        if (req.requisition_type === 'pasante' && internMap.has(recruiterName)) {
          const intern = internMap.get(recruiterName)!
          if (isOpen) {
            intern.vacantes_abiertas++
          } else {
            intern.vacantes_cerradas++
          }
        }
      })

      // --- 4. Calcular avg, min y max para cada entidad y limpiar datos ---
      const finalCompanyData = Array.from(companyMap.values()).map(comp => {
        if (comp.closingTimes.length > 0) {
          const sum = comp.closingTimes.reduce((a, b) => a + b, 0)
          comp.avgClosingTime = sum / comp.closingTimes.length
          comp.minClosingTime = Math.min(...comp.closingTimes)
          comp.maxClosingTime = Math.max(...comp.closingTimes)
        }
        delete (comp as any).closingTimes // Limpiar el campo temporal
        return comp
      })

      const finalRecruiterData = Array.from(recruiterMap.values()).map(rec => {
        if (rec.closingTimes.length > 0) {
          const sum = rec.closingTimes.reduce((a, b) => a + b, 0)
          rec.avgClosingTime = sum / rec.closingTimes.length
          rec.minClosingTime = Math.min(...rec.closingTimes)
          rec.maxClosingTime = Math.max(...rec.closingTimes)
        }
        delete (rec as any).closingTimes // Limpiar el campo temporal
        return rec
      })

      // --- 5. Actualizar estados ---
      setCompanyData(finalCompanyData)
      setRecruiterData(finalRecruiterData)
      setInternData(Array.from(internMap.values()).filter(i => i.vacantes_abiertas > 0 || i.vacantes_cerradas > 0))
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
    refetch: fetchIndicators,
  }
}