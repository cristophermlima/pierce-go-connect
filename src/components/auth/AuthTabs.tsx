
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthTabs() {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
    city?: string;
  }>({});

  return (
    <div className="border border-border/30 rounded-lg p-6 bg-card/80 backdrop-blur-sm">
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="register">Cadastrar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="space-y-4">
          <LoginForm 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
          />
        </TabsContent>
        
        <TabsContent value="register" className="space-y-4">
          <RegisterForm 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
