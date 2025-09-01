
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import CVAnalysisPage from "./pages/cv-analysis";
import { Index } from "./pages/Index";
import { Navbar } from "./components/navbar/navbar1";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <div className="flex flex-col">
                  <Navbar />
                  <div className="flex-1 ml-16">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/candidate-analysis" element={
                        <ProtectedRoute requiredModule="comparativos" requiredPermission="read">
                          <CVAnalysisPage />
                        </ProtectedRoute>
                      } />
                      {/*
                      <Route path="/dashboard" element={
                        <ProtectedRoute requiredModule="dashboard" requiredPermission="read">
                          <Indicators />
                        </ProtectedRoute>
                      } />
                      <Route path="/phases" element={
                        <ProtectedRoute requiredRole="admin">
                          <Phases />
                        </ProtectedRoute>
                      } />
                       <Route path="/portal" element={
                        <ProtectedRoute>
                          <CandidatePortal />
                        </ProtectedRoute>
                      } />
                      <Route path="/vacantes" element={
                        <ProtectedRoute requiredModule="processes" requiredPermission="read">
                          <Processes />
                        </ProtectedRoute>
                      } />
                      <Route path="/search" element={
                        <ProtectedRoute requiredModule="buscador" requiredPermission="write">
                          <Search />
                        </ProtectedRoute>
                      } />
                      <Route path="/requisicion" element={
                        <ProtectedRoute requiredModule="requisicion" requiredPermission="write">
                          <Requisition />
                        </ProtectedRoute>
                      } />
                      <Route path="/repositorio" element={
                        <ProtectedRoute requiredRole="reclutador">
                          <RequisitionsPage />
                        </ProtectedRoute>
                      }
                      />
                      <Route path="/register" element={
                        <ProtectedRoute requiredRole="personal">
                          <ManualRegistration />
                        </ProtectedRoute>
                      } />
                      <Route path="/searches" element={
                        <ProtectedRoute requiredModule="busquedas" requiredPermission="write" >
                          <Searches />
                        </ProtectedRoute>
                      } />
                      <Route path="/searches/:searchId" element={
                        <ProtectedRoute requiredRole="personal">
                          <SearchPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/candidates/:processId" element={
                        <ProtectedRoute requiredRole="reclutador">
                          <KanbanPage />
                        </ProtectedRoute>
                      } />
                      
                      <Route path="/interview-scripts" element={
                        <ProtectedRoute requiredModule="guiones" requiredPermission="write">
                          <InterviewScripts />
                        </ProtectedRoute>
                      } />
                      <Route path="/interview-analysis" element={
                        <ProtectedRoute requiredModule="entrevistas" requiredPermission="write">
                          <Interviews />
                        </ProtectedRoute>
                      } />

                      <Route path="/settings" element={<AdminPanel />} />
                      }*/}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
