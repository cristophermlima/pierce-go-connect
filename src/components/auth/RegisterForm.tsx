import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RegisterFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  formErrors: {
    email?: string;
    password?: string;
    name?: string;
    city?: string;
    profileType?: string;
  };
  setFormErrors: (errors: any) => void;
}

const PROFILE_TYPES = [
  { value: "piercer_individual", label: "Piercer Individual" },
  { value: "piercing_shop", label: "Loja de Piercing" },
  { value: "piercing_tattoo_studio", label: "Estúdio de Piercing e Tatuagem" },
  { value: "supplier", label: "Fornecedor de Joias e Materiais" },
  { value: "event_promoter", label: "Promotor de Eventos" },
];

export default function RegisterForm({ isLoading, setIsLoading, formErrors, setFormErrors }: RegisterFormProps) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileType, setProfileType] = useState("");

  const validateForm = () => {
    const errors: {
      email?: string;
      password?: string;
      name?: string;
      city?: string;
      profileType?: string;
    } = {};

    if (!email) errors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email inválido";

    if (!password) errors.password = "Senha é obrigatória";
    else if (password.length < 6) errors.password = "A senha deve ter pelo menos 6 caracteres";

    if (!name) errors.name = "Nome é obrigatório";
    if (!city) errors.city = "Cidade é obrigatória";
    if (!profileType) errors.profileType = "Selecione o tipo de perfil";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(email, password, { 
        fullName: name, 
        city,
        profileType 
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="space-y-3">
        <Label>Tipo de perfil</Label>
        <RadioGroup
          value={profileType}
          onValueChange={setProfileType}
          className="space-y-2"
        >
          {PROFILE_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-3">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value} className="font-normal cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {formErrors.profileType && (
          <p className="text-red-500 text-sm">{formErrors.profileType}</p>
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
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`pr-10 ${formErrors.password ? "border-red-500" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
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
  );
}
