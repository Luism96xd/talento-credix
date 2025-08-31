
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchDetailsPage";
import Auth from "./pages/Auth";
import CVAnalysisPage from "./pages/cv-analysis";
import Interviews from "./pages/Interviews";
import { InterviewScripts } from "./pages/Scripts";
import { Phases } from "./pages/Phases";
import { Processes } from "./pages/Processes";
import Searches from "./pages/Searches";
import { Search } from "./pages/SearchPage";
import { Requisition } from "./pages/Requisition";
import { Index } from "./pages/Index";
import { RequisitionsPage } from "./pages/RequisitionsPage";
import { PublicRegistration } from "./pages/PublicRegistration";
import { ManualRegistration } from "./pages/ManualRegistration";
import { KanbanPage } from "./pages/KanbanPage";
import SettingsPage from "./pages/SettingsPage";
import Indicators from "./pages/Indicators";
import AdminPanel from "./pages/AdminPanel";
import CandidatePortal from "./components/candidates/CandidatePortal";

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
            <Route path="/apply" element={<PublicRegistration />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <div className="flex">
                  <Navbar />
                  <div className="flex-1 ml-16">
                    <Routes>
                      <Route path="/" element={<Index />} />
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
                        <ProtectedRoute requiredRole="admin">
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
                      <Route path="/candidate-analysis" element={
                        <ProtectedRoute requiredModule="comparativos" requiredPermission="write">
                          <CVAnalysisPage />
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
