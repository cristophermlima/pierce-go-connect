import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Upload, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface RegisterFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  formErrors: {
    email?: string;
    password?: string;
    name?: string;
    city?: string;
    profileType?: string;
    certificate?: string;
  };
  setFormErrors: (errors: any) => void;
}

const PROFILE_TYPES = [
  { value: "piercer_individual", label: "Piercer Individual", requiresCertificate: true },
  { value: "piercing_shop", label: "Loja de Piercing", requiresCertificate: true },
  { value: "piercing_tattoo_studio", label: "Estúdio de Piercing e Tatuagem", requiresCertificate: true },
  { value: "supplier", label: "Fornecedor de Joias e Materiais", requiresCertificate: false },
  { value: "event_promoter", label: "Promotor de Eventos", requiresCertificate: false },
];

export default function RegisterForm({ isLoading, setIsLoading, formErrors, setFormErrors }: RegisterFormProps) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileType, setProfileType] = useState("");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [certificatePreview, setCertificatePreview] = useState<string | null>(null);

  const selectedProfileType = PROFILE_TYPES.find(t => t.value === profileType);
  const requiresCertificate = selectedProfileType?.requiresCertificate || false;

  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB");
        return;
      }
      setCertificateFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificatePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCertificate = () => {
    setCertificateFile(null);
    setCertificatePreview(null);
  };

  const validateForm = () => {
    const errors: {
      email?: string;
      password?: string;
      name?: string;
      city?: string;
      profileType?: string;
      certificate?: string;
    } = {};

    if (!email) errors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email inválido";

    if (!password) errors.password = "Senha é obrigatória";
    else if (password.length < 6) errors.password = "A senha deve ter pelo menos 6 caracteres";

    if (!name) errors.name = "Nome é obrigatório";
    if (!city) errors.city = "Cidade é obrigatória";
    if (!profileType) errors.profileType = "Selecione o tipo de perfil";
    
    if (requiresCertificate && !certificateFile) {
      errors.certificate = "O certificado é obrigatório para piercers";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadCertificate = async (userId: string): Promise<string | null> => {
    if (!certificateFile) return null;

    const fileExt = certificateFile.name.split('.').pop();
    const filePath = `${userId}/certificate.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, certificateFile, { upsert: true });

    if (uploadError) {
      console.error('Error uploading certificate:', uploadError);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(email, password, { 
        fullName: name, 
        city,
        profileType,
        certificateFile: requiresCertificate ? certificateFile : null
      });
      if (error) throw error;

      // Upload certificate after signup if needed
      if (requiresCertificate && certificateFile) {
        setTimeout(async () => {
          const { data: userRecord } = await supabase.auth.getUser();
          const userId = userRecord?.user?.id;
          if (userId) {
            const certificateUrl = await uploadCertificate(userId);
            if (certificateUrl) {
              await supabase
                .from('profiles')
                .update({ 
                  certificate_url: certificateUrl,
                  certificate_status: 'pending'
                })
                .eq('id', userId);
            }
          }
        }, 1500);
      }
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
                {type.requiresCertificate && (
                  <span className="text-xs text-muted-foreground ml-1">(requer certificado)</span>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {formErrors.profileType && (
          <p className="text-red-500 text-sm">{formErrors.profileType}</p>
        )}
      </div>

      {requiresCertificate && (
        <div className="space-y-2">
          <Label>Certificado de Piercer</Label>
          <p className="text-sm text-muted-foreground">
            Envie uma foto do seu certificado profissional. Ele será analisado pela nossa equipe antes da aprovação do seu cadastro.
          </p>
          
          {certificatePreview ? (
            <div className="relative">
              <img 
                src={certificatePreview} 
                alt="Preview do certificado" 
                className="w-full max-h-48 object-contain rounded-lg border"
              />
              <button
                type="button"
                onClick={removeCertificate}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Clique para enviar o certificado
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG ou PDF (máx. 5MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleCertificateChange}
              />
            </label>
          )}
          {formErrors.certificate && (
            <p className="text-red-500 text-sm">{formErrors.certificate}</p>
          )}
        </div>
      )}
      
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
