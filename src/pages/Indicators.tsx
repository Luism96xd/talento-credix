import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IndicatorsTable from "@/components/IndicatorsTable"
import { useIndicators } from "@/hooks/useIndicators"

const Indicators = () => {
  const { companyData, recruiterData, internData, loading, error } = useIndicators()

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-destructive">
          Error al cargar los indicadores: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Indicadores de Personal</h1>
        <p className="text-muted-foreground mt-2">
          Dashboard de vacantes y solicitudes de personal
        </p>
      </div>

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="global">Vista Global</TabsTrigger>
          <TabsTrigger value="recruiters">Vista de Reclutadores</TabsTrigger>
          <TabsTrigger value="interns">Vista de Pasantes</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Indicadores por Empresa</h2>
            <div className="border rounded-lg overflow-hidden">
              <IndicatorsTable 
                type="company" 
                data={companyData} 
                loading={loading} 
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recruiters" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Indicadores por Reclutador</h2>
            <div className="border rounded-lg overflow-hidden">
              <IndicatorsTable 
                type="recruiter" 
                data={recruiterData} 
                loading={loading} 
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interns" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Indicadores de Pasantes por Reclutador</h2>
            <div className="border rounded-lg overflow-hidden">
              <IndicatorsTable 
                type="intern" 
                data={internData} 
                loading={loading} 
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Indicators