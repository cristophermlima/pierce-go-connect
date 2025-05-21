
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
    city?: string;
  }>({});

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = (isSignUp: boolean) => {
    const errors: {
      email?: string;
      password?: string;
      name?: string;
      city?: string;
    } = {};

    if (!email) errors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email inválido";

    if (!password) errors.password = "Senha é obrigatória";
    else if (password.length < 6) errors.password = "A senha deve ter pelo menos 6 caracteres";

    if (isSignUp) {
      if (!name) errors.name = "Nome é obrigatório";
      if (!city) errors.city = "Cidade é obrigatória";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(false)) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Falha ao realizar login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(true)) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(email, password, { fullName: name, city });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Falha ao realizar cadastro.");
    } finally {
      setIsLoading(false);
    }
  };

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
          
          <div className="border border-border/30 rounded-lg p-6 bg-card/80 backdrop-blur-sm">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        Esqueceu a senha?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={formErrors.password ? "border-red-500" : ""}
                    />
                    {formErrors.password && (
                      <p className="text-red-500 text-sm">{formErrors.password}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Sua cidade"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={formErrors.city ? "border-red-500" : ""}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-sm">{formErrors.city}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={formErrors.password ? "border-red-500" : ""}
                    />
                    {formErrors.password && (
                      <p className="text-red-500 text-sm">{formErrors.password}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink"
                    disabled={isLoading}
                  >
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
