
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import AuthTabs from "@/components/auth/AuthTabs";

export default function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Acesse sua conta</h1>
            <p className="text-muted-foreground">
              Faça login ou crie uma conta para acessar todas as funcionalidades do PiercerGo
            </p>
          </div>
          
          <AuthTabs />
        </div>
      </div>
    </MainLayout>
  );
}
