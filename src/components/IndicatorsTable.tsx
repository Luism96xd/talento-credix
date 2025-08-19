import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CompanyIndicators, InternIndicators, RecruiterIndicators } from "@/types"

interface IndicatorsTableProps {
  type: 'company' | 'recruiter' | 'intern'
  data: CompanyIndicators[] | RecruiterIndicators[] | InternIndicators[]
  loading: boolean
}

export default function IndicatorsTable({ type, data, loading }: IndicatorsTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Cargando indicadores...</div>
      </div>
    )
  }

  const formatDays = (days) => {
    if (days === null || days === undefined) return 'N/A';
    return days.toFixed(1); // Muestra un decimal, ej: 15.3
  }

  const calculateTotals = () => {
    if (type === 'intern') {
      const internData = data as InternIndicators[]
      return {
        vacantes_cerradas: internData.reduce((sum, item) => sum + item.vacantes_cerradas, 0),
        vacantes_abiertas: internData.reduce((sum, item) => sum + item.vacantes_abiertas, 0)
      }
    } else {
      const fullData = data as (CompanyIndicators[] | RecruiterIndicators[])
      return {
        vacantes_cerradas: fullData.reduce((sum, item) => sum + item.vacantes_cerradas, 0),
        vacantes_abiertas: fullData.reduce((sum, item) => sum + item.vacantes_abiertas, 0),
        operativo: fullData.reduce((sum, item) => sum + item.operativo, 0),
        coordinacion: fullData.reduce((sum, item) => sum + item.coordinacion, 0),
        jefatura: fullData.reduce((sum, item) => sum + item.jefatura, 0),
        gerencia: fullData.reduce((sum, item) => sum + item.gerencia, 0),
        totalAvgClosingTime: fullData.reduce((sum, item) => sum + item.avgClosingTime || 0, 0) / fullData.length,
        totalMinClosingTime: fullData.reduce((sum, item) => sum + item.minClosingTime || 0, 0) / fullData.length,
        totalMaxClosingTime: fullData.reduce((sum, item) => sum + item.maxClosingTime || 0, 0) / fullData.length
      }
    }
  }

  const totals = calculateTotals()

  if (type === 'intern') {
    const internData = data as InternIndicators[]
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Reclutador</TableHead>
            <TableHead className="text-center font-semibold">N° de vacantes cerradas</TableHead>
            <TableHead className="text-center font-semibold">N° de vacantes abiertas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {internData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.recruiter_name}</TableCell>
              <TableCell className="text-center">{item.vacantes_cerradas}</TableCell>
              <TableCell className="text-center">{item.vacantes_abiertas}</TableCell>
            </TableRow>
          ))}
          {internData.length > 0 && (
            <TableRow className="bg-muted font-semibold">
              <TableCell>Total</TableCell>
              <TableCell className="text-center">{totals.vacantes_cerradas}</TableCell>
              <TableCell className="text-center">{totals.vacantes_abiertas}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }

  const fullData = data as (CompanyIndicators[] | RecruiterIndicators[])
  const entityName = type === 'company' ? 'Empresa' : 'Reclutador'

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">{entityName}</TableHead>
          <TableHead className="text-center font-semibold">N° de vacantes cerradas</TableHead>
          <TableHead className="text-center font-semibold">N° de vacantes abiertas</TableHead>
          <TableHead className="text-center font-semibold">Operativo</TableHead>
          <TableHead className="text-center font-semibold">Coordinación</TableHead>
          <TableHead className="text-center font-semibold">Jefatura</TableHead>
          <TableHead className="text-center font-semibold">Gerencia</TableHead>
          <TableHead className="text-center font-semibold">Prom. Cierre (días)</TableHead>
          <TableHead className="text-center font-semibold">Mín. Cierre (días)</TableHead>
          <TableHead className="text-center font-semibold">Máx. Cierre (días)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fullData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              {type === 'company' ? (item as CompanyIndicators).company_name : (item as RecruiterIndicators).recruiter_name}
            </TableCell>
            <TableCell className="text-center">{item.vacantes_cerradas}</TableCell>
            <TableCell className="text-center">{item.vacantes_abiertas}</TableCell>
            <TableCell className="text-center">{item.operativo}</TableCell>
            <TableCell className="text-center">{item.coordinacion}</TableCell>
            <TableCell className="text-center">{item.jefatura}</TableCell>
            <TableCell className="text-center">{item.gerencia}</TableCell>
            <TableCell className="text-center">{formatDays(item.avgClosingTime)}</TableCell>
            <TableCell className="text-center">{formatDays(item.minClosingTime)}</TableCell>
            <TableCell className="text-center">{formatDays(item.maxClosingTime)}</TableCell>
          </TableRow>
        ))}
        {fullData.length > 0 && (
          <TableRow className="bg-muted font-semibold">
            <TableCell>Total</TableCell>
            <TableCell className="text-center">{totals.vacantes_cerradas}</TableCell>
            <TableCell className="text-center">{totals.vacantes_abiertas}</TableCell>
            <TableCell className="text-center">{totals.operativo}</TableCell>
            <TableCell className="text-center">{totals.coordinacion}</TableCell>
            <TableCell className="text-center">{totals.jefatura}</TableCell>
            <TableCell className="text-center">{totals.gerencia}</TableCell>
            <TableCell className="text-center">{totals.totalAvgClosingTime.toFixed(2)}</TableCell>
            <TableCell className="text-center">{totals.totalMinClosingTime.toFixed(2)}</TableCell>
            <TableCell className="text-center">{totals.totalMaxClosingTime.toFixed(2)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}