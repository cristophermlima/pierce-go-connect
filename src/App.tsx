
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import EventsPage from "@/pages/EventsPage";
import EventDetailPage from "@/pages/EventDetailPage";
import AddEventPage from "@/pages/AddEventPage";
import SuppliersPage from "@/pages/SuppliersPage";
import EvaluationsPage from "@/pages/EvaluationsPage";
import SchedulePage from "@/pages/SchedulePage";
import AddScheduleEventPage from "@/pages/AddScheduleEventPage";
import TravelPage from "@/pages/TravelPage";
import SubmitPage from "@/pages/SubmitPage";
import PlansPage from "@/pages/PlansPage";
import ProfilePage from "@/pages/ProfilePage";
import SuccessPage from "@/pages/SuccessPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/eventos" element={<EventsPage />} />
            <Route path="/eventos/:id" element={<EventDetailPage />} />
            <Route path="/eventos/adicionar" element={<AddEventPage />} />
            <Route path="/fornecedores" element={<SuppliersPage />} />
            <Route path="/avaliacoes" element={<EvaluationsPage />} />
            <Route path="/agenda" element={
              <ProtectedRoute>
                <SchedulePage />
              </ProtectedRoute>
            } />
            <Route path="/agenda/adicionar" element={
              <ProtectedRoute>
                <AddScheduleEventPage />
              </ProtectedRoute>
            } />
            <Route path="/viagens" element={
              <ProtectedRoute>
                <TravelPage />
              </ProtectedRoute>
            } />
            <Route path="/cadastrar" element={<SubmitPage />} />
            <Route path="/planos" element={<PlansPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/perfil" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/sucesso" element={<SuccessPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
