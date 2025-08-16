
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchDetailsPage";
import Auth from "./pages/Auth";
import CVAnalysisPage from "./pages/cv-analysis";
import { Interviews } from "./pages/Interviews";
import { InterviewScripts } from "./pages/Scripts";
import { Settings } from "./components/Settings";
import { Phases } from "./pages/Phases";
import { Processes } from "./pages/Processes";
import Searches from "./pages/Searches";
import { Search } from "./pages/SearchPage";
import { Requisition } from "./pages/Requisition";
import { Index } from "./pages/Index";
import { RequisitionsPage } from "./pages/RequisitionsPage";
import { PublicRegistration } from "./pages/PublicRegistration";
import { ManualRegistration } from "./pages/ManualRegistration";
import { CandidatesPage } from "./pages/Candidates";

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
                <div className="flex">
                  <Navbar />
                  <div className="flex-1 ml-16">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/apply" element={<PublicRegistration />} />
                      <Route path="/fases" element={<Phases />} />
                      <Route path="/procesos" element={<Processes />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/requisicion" element={<Requisition />} />
                      <Route path="/repositorio" element={<RequisitionsPage />} />
                      <Route path="/candidates" element={<CandidatesPage />} />
                      <Route path="/register" element={<ManualRegistration />} />
                      <Route path="/searches" element={<Searches />} />
                      <Route path="/searches/:searchId" element={<SearchPage />} />
                      <Route path="/candidates" element={<RequisitionsPage />} />
                      <Route path="/candidate-analysis" element={<CVAnalysisPage />} />
                      <Route path="/interview-analysis" element={<Interviews />} />
                      <Route path="/interview-scripts" element={<InterviewScripts />} />
                      <Route path="/settings" element={<Settings />} />
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
