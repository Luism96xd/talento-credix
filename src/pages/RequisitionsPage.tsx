import RequisitionsTable from "@/components/requests/RequisitionsTable";

export const RequisitionsPage = () => {
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
          <RequisitionsTable />
        </div>
      </div>
    </div>
  );
};
