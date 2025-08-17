import RequisitionsTable from "@/components/requests/RequisitionsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IndicatorsTable from "@/components/IndicatorsTable"
import { useIndicators } from "@/hooks/useIndicators";
import { Card, CardContent } from "@/components/ui/card";

export const RequisitionsPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Consulta de Solicitudes</h1>
            <p className="text-muted-foreground mt-2">
              Revisa todas las solicitudes de personal enviadas
            </p>
          </div>
          <Tabs defaultValue="global" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white">
              <TabsTrigger value="global">Vista Global</TabsTrigger>
              <TabsTrigger value="recruiters">Vista de Reclutadores</TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="my-6">
              <Card className="space-y-4">
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold">Indicadores por Empresa</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <IndicatorsTable
                      type="company"
                      data={companyData}
                      loading={loading}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recruiters" className="mt-6">
              <Card className="space-y-4">
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold">Indicadores por Reclutador</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <IndicatorsTable
                      type="recruiter"
                      data={recruiterData}
                      loading={loading}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
          <RequisitionsTable />
        </div>
      </div>
    </div>
  );
};
