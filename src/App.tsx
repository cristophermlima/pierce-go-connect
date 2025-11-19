import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/hooks/useSubscription";
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
import PiercersPage from "@/pages/PiercersPage";
import AddPiercerPage from "@/pages/AddPiercerPage";
import LearningPage from "@/pages/LearningPage";
import AddLearningResourcePage from "@/pages/AddLearningResourcePage";
import ProfilePage from "@/pages/ProfilePage";
import SuccessPage from "@/pages/SuccessPage";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminPage from "@/pages/AdminPage";
import AdminUsersPage from "@/pages/AdminUsersPage";
import AdminEventsPage from "@/pages/AdminEventsPage";
import AdminSuppliersPage from "@/pages/AdminSuppliersPage";
import SupplierDashboardPage from "@/pages/SupplierDashboardPage";
import OrganizerDashboardPage from "@/pages/OrganizerDashboardPage";
import FAQAssinaturasPage from "@/pages/FAQAssinaturasPage";

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
      <Router>
        <AuthProvider>
          <SubscriptionProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/eventos" element={<EventsPage />} />
              <Route path="/eventos/:id" element={<EventDetailPage />} />
              <Route path="/fornecedores" element={<SuppliersPage />} />
              <Route path="/avaliacoes" element={<EvaluationsPage />} />
              <Route path="/cadastrar" element={<SubmitPage />} />
              <Route path="/planos" element={<PlansPage />} />
              {/* FAQ – Dúvidas frequentes sobre assinaturas */}
              <Route path="/faq-assinaturas" element={<FAQAssinaturasPage />} />
              <Route path="/piercers" element={<PiercersPage />} />
              <Route path="/piercers/cadastrar" element={
                <ProtectedRoute>
                  <AddPiercerPage />
                </ProtectedRoute>
              } />
              <Route path="/aprender" element={<LearningPage />} />
              <Route path="/aprender/adicionar" element={
                <ProtectedRoute>
                  <AddLearningResourcePage />
                </ProtectedRoute>
              } />
              <Route path="/sucesso" element={<SuccessPage />} />
              
              {/* Protected Routes */}
              <Route path="/eventos/adicionar" element={
                <ProtectedRoute>
                  <AddEventPage />
                </ProtectedRoute>
              } />
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
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/usuarios" element={
                <ProtectedRoute>
                  <AdminUsersPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/eventos" element={
                <ProtectedRoute>
                  <AdminEventsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/fornecedores" element={
                <ProtectedRoute>
                  <AdminSuppliersPage />
                </ProtectedRoute>
              } />
              
              {/* Role-specific Dashboards */}
              <Route path="/fornecedor/dashboard" element={
                <ProtectedRoute>
                  <SupplierDashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/organizador/dashboard" element={
                <ProtectedRoute>
                  <OrganizerDashboardPage />
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </SubscriptionProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
