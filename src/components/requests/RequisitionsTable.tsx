import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Requisition } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label"
import { useRequisitions } from "@/hooks/useRequisitions"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useEffect, useState } from "react"
import { Download, Eye } from "lucide-react"
import { Company, Country } from "@/types"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import RequisitionDetails from "@/pages/RequisitionDetails"
import { calculateDaysOpen } from "@/lib/utils"

const getStatusColor = (status: string) => {
  switch (status) {
    case 'closed':
      return 'bg-muted text-muted-foreground'
    case 'open':
      return 'bg-primary text-primary-foreground'
    case 'approved':
      return 'bg-green-500 text-white'
    case 'rejected':
      return 'bg-destructive text-destructive-foreground'
    default:
      return 'bg-secondary text-secondary-foreground'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'open':
      return 'Abierta'
    case 'paused':
      return 'En pausa'
    case 'closed':
      return 'Cerrada'
    case 'approved':
      return 'Aprobado'
    case 'rejected':
      return 'Rechazado'
    default:
      return status
  }
}

export default function RequisitionsTable() {
  const { toast } = useToast()
  const [countries, setCountries] = useState<Country[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState<Requisition | null>(null);
  const [filters, setFilters] = useState({
    country: '',
    company: '',
    cargoType: '',
    status: '',
    period: ''
  })

  const { requisitions, loading, error } = useRequisitions(filters)

  useEffect(() => {
    fetchCountries()
    fetchCompanies()
  }, [])


  const fetchCountries = async () => {
    try {
      const { data, error } = await supabase
        .from('countries')
        .select('id, name')

      if (error) throw error;
      setCountries((data) || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch countries",
        variant: "destructive"
      });
    }
  };
  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name')

      if (error) throw error;
      setCompanies((data) || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch companies",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = (requisitionId: string) => {
    // TODO: Implement PDF download functionality
    console.log('Download PDF for requisition:', requisitionId)
  }

  const handleOpenModal = (requisition: Requisition) => {
    setSelectedRequisition(requisition);
    setIsModalOpen(true);
  }


  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Solicitudes de Personal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitudes de Personal</CardTitle>
        <p className="text-muted-foreground">
          Total de solicitudes: {requisitions.length}
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          {countries && (
            <div className="space-y-2">
              <Label htmlFor="country-filter">País</Label>
              <Select
                value={filters.country}
                onValueChange={(value) => setFilters(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger id="country-filter">
                  <SelectValue placeholder="Todos los países" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los países</SelectItem>
                  {countries && countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {companies && (
            <div className="space-y-2">
              <Label htmlFor="company-filter">Compañía</Label>
              <Select
                value={filters.company}
                onValueChange={(value) => setFilters(prev => ({ ...prev, company: value }))}
              >
                <SelectTrigger id="company-filter">
                  <SelectValue placeholder="Todas las compañías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las compañías</SelectItem>
                  {companies && companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="cargo-type-filter">Tipo de Cargo</Label>
            <Select
              value={filters.cargoType}
              onValueChange={(value) => setFilters(prev => ({ ...prev, cargoType: value }))}
            >
              <SelectTrigger id="cargo-type-filter">
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="Operativo">Operativo</SelectItem>
                <SelectItem value="Coordinación">Coordinación</SelectItem>
                <SelectItem value="Jefatura">Jefatura</SelectItem>
                <SelectItem value="Gerencia">Gerencia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-filter">Estado</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="open">Abiertas</SelectItem>
                <SelectItem value="closed">Cerradas</SelectItem>
                <SelectItem value="paused">En Pausa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="period-filter">Periodo</Label>
            <Select
              value={filters.period}
              onValueChange={(value) => setFilters(prev => ({ ...prev, period: value }))}
            >
              <SelectTrigger id="period-filter">
                <SelectValue placeholder="Todos los periodos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los periodos</SelectItem>
                <SelectItem value="2024-01">Enero 2024</SelectItem>
                <SelectItem value="2024-02">Febrero 2024</SelectItem>
                <SelectItem value="2024-03">Marzo 2024</SelectItem>
                <SelectItem value="2024-04">Abril 2024</SelectItem>
                <SelectItem value="2024-05">Mayo 2024</SelectItem>
                <SelectItem value="2024-06">Junio 2024</SelectItem>
                <SelectItem value="2024-07">Julio 2024</SelectItem>
                <SelectItem value="2024-08">Agosto 2024</SelectItem>
                <SelectItem value="2024-09">Septiembre 2024</SelectItem>
                <SelectItem value="2024-10">Octubre 2024</SelectItem>
                <SelectItem value="2024-11">Noviembre 2024</SelectItem>
                <SelectItem value="2024-12">Diciembre 2024</SelectItem>
                <SelectItem value="2025-01">Enero 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha Solicitud</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Compañía</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Posición Solicitada</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Tipo de Cargo</TableHead>
              <TableHead>Solicitado por</TableHead>
              <TableHead>Asignado a</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Días Abierta</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requisitions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center text-muted-foreground py-8">
                  No hay solicitudes registradas
                </TableCell>
              </TableRow>
            ) : (
              requisitions.map((requisition) => (
                <TableRow key={requisition.id}>
                  <TableCell>
                    {requisition.request_date
                      ? format(new Date(requisition.request_date), 'dd/MM/yyyy', { locale: es })
                      : '-'
                    }
                  </TableCell>
                  <TableCell>
                    {requisition.country_name || '-'}
                  </TableCell>
                  <TableCell>
                    {requisition.company_name || '-'}
                  </TableCell>
                  <TableCell>
                    {requisition.department_name || '-'}
                  </TableCell>
                  <TableCell>
                    {requisition.positions_name || '-'}
                  </TableCell>
                  <TableCell>
                    {requisition.work_location || '-'}
                  </TableCell>
                  <TableCell className="capitalize">
                    {requisition.cargo_type || '-'}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{requisition.requested_by_name || '-'}</div>
                      <div className="text-sm text-muted-foreground">
                        {requisition.requested_by_position || '-'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {requisition.assigned_to || '-'}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(requisition.status)}>
                      {getStatusLabel(requisition.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {requisition.status === 'open' ? calculateDaysOpen(requisition.created_at) : requisition.days_open} días
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(requisition.id)}
                        className="flex items-center"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(requisition)}
                        className="flex items-center"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Requisición #{selectedRequisition?.number}</DialogTitle>
            </DialogHeader>
            <RequisitionDetails requisition={selectedRequisition} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}