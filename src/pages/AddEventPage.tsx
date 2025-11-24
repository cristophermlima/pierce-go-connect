
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AddEventPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    startDate: "",
    endDate: "",
    price: "",
    location: "",
    address: "",
    description: "",
    image: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Por favor, selecione uma imagem válida");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    setImageFile(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    handleInputChange("image", previewUrl);
    toast.success("Imagem selecionada com sucesso!");
  };

  const removeImage = () => {
    setImageFile(null);
    handleInputChange("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.title || !formData.type || !formData.startDate) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
    }
    if (currentStep === 2) {
      if (!selectedPlan) {
        toast.error("Selecione um plano de divulgação");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Evento criado com sucesso!");
      navigate("/eventos");
    } catch (error) {
      toast.error("Erro ao criar evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-transparent py-6 lg:py-10">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="outline"
                className="mb-4"
                onClick={() => navigate("/eventos")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Adicionar Novo Evento</h1>
              <p className="text-muted-foreground">
                Preencha as informações do seu evento para publicá-lo na plataforma
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  1
                </div>
                <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-red-500' : 'bg-muted'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-red-500' : 'bg-muted'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  3
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-sm text-muted-foreground">
                {currentStep === 1 && "Detalhes"}
                {currentStep === 2 && "Plano"}
                {currentStep === 3 && "Pagamento"}
              </div>
            </div>

            {/* Step Content */}
            <Card className="glass-card">
              <CardContent className="p-6 lg:p-8">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle>Informações do Evento</CardTitle>
                    </CardHeader>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Título do Evento *</label>
                        <Input
                          placeholder="Ex: Workshop de Técnicas Avançadas"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tipo de Evento *</label>
                        <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="conferencia">Conferência</SelectItem>
                            <SelectItem value="curso">Curso</SelectItem>
                            <SelectItem value="meetup">Meetup</SelectItem>
                            <SelectItem value="exposicao">Exposição</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Data de Início *</label>
                        <Input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange("startDate", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Data de Término</label>
                        <Input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => handleInputChange("endDate", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preço do Evento (R$)</label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Local *</label>
                        <Input
                          placeholder="Ex: Centro de Convenções"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Endereço Completo</label>
                      <Input
                        placeholder="Ex: Av. Paulista, 1000 - Bela Vista, São Paulo - SP"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Descrição do Evento *</label>
                      <Textarea
                        placeholder="Descreva seu evento em detalhes..."
                        className="h-32"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Imagem do Evento</label>
                      {formData.image ? (
                        <div className="relative border-2 border-border rounded-lg overflow-hidden">
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="w-full h-64 object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={removeImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground mb-2">
                            {imageFile ? imageFile.name : "Nenhum arquivo escolhido"}
                          </p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <Button 
                            variant="outline" 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Selecionar Arquivo
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email de Contato *</label>
                        <Input
                          type="email"
                          placeholder="seuemail@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Telefone de Contato</label>
                        <Input
                          placeholder="(00) 00000-0000"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle>Escolha seu Plano de Divulgação</CardTitle>
                      <p className="text-muted-foreground">
                        Selecione como você deseja que seu evento seja divulgado na plataforma
                      </p>
                    </CardHeader>

                    <div className="space-y-6">
                      {/* Plano Básico */}
                      <Card 
                        className={`cursor-pointer transition-all ${selectedPlan === 'basico' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedPlan('basico')}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2">Plano Básico</h3>
                              <div className="text-2xl font-bold mb-2">R$ 49,90</div>
                              <p className="text-sm text-muted-foreground mb-4">Divulgação por 30 dias</p>
                              
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Listagem na página de eventos
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Página de detalhes do evento
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Sistema de avaliações
                                </li>
                              </ul>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${selectedPlan === 'basico' ? 'bg-primary border-primary' : 'border-muted-foreground'}`}></div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Plano Destaque */}
                      <Card 
                        className={`cursor-pointer transition-all relative ${selectedPlan === 'destaque' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedPlan('destaque')}
                      >
                        <div className="absolute -top-3 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                          POPULAR
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2">Plano Destaque</h3>
                              <div className="text-2xl font-bold mb-2">R$ 99,90</div>
                              <p className="text-sm text-muted-foreground mb-4">Divulgação por 60 dias</p>
                              
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Tudo do Plano Básico
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Destaque na página inicial
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Compartilhamento nas redes sociais
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Prioridade nos resultados de busca
                                </li>
                              </ul>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${selectedPlan === 'destaque' ? 'bg-primary border-primary' : 'border-muted-foreground'}`}></div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Plano Premium */}
                      <Card 
                        className={`cursor-pointer transition-all ${selectedPlan === 'premium' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedPlan('premium')}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2">Plano Premium</h3>
                              <div className="text-2xl font-bold mb-2">R$ 199,90</div>
                              <p className="text-sm text-muted-foreground mb-4">Divulgação por 90 dias</p>
                              
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Tudo do Plano Destaque
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Banner exclusivo no topo da página
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Envio de email para usuários interessados
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Relatório de desempenho e estatísticas
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Suporte prioritário
                                </li>
                              </ul>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${selectedPlan === 'premium' ? 'bg-primary border-primary' : 'border-muted-foreground'}`}></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle>Finalizar Pagamento</CardTitle>
                      <p className="text-muted-foreground">
                        Complete o pagamento para enviar seu evento para aprovação.
                      </p>
                    </CardHeader>

                    <div className="space-y-6">
                      {/* Resumo do Pedido */}
                      <div className="bg-muted/30 rounded-lg p-6">
                        <h3 className="font-semibold mb-4">Resumo do Pedido</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Plano {selectedPlan === 'basico' ? 'Básico' : selectedPlan === 'destaque' ? 'Destaque' : 'Premium'}</span>
                            <span>
                              {selectedPlan === 'basico' ? 'R$ 49,90' : selectedPlan === 'destaque' ? 'R$ 99,90' : 'R$ 199,90'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Taxa de processamento</span>
                            <span>R$ 0,00</span>
                          </div>
                          <hr className="my-2" />
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>
                              {selectedPlan === 'basico' ? 'R$ 49,90' : selectedPlan === 'destaque' ? 'R$ 99,90' : 'R$ 199,90'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Form */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-center p-2 bg-background rounded text-sm font-medium">
                            Cartão de Crédito
                          </div>
                          <div className="flex items-center justify-center text-sm text-muted-foreground">
                            PIX
                          </div>
                          <div className="flex items-center justify-center text-sm text-muted-foreground">
                            Boleto
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Número do Cartão</label>
                            <Input placeholder="0000 0000 0000 0000" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Data de Validade</label>
                              <Input placeholder="MM/AA" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">CVC</label>
                              <Input placeholder="123" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Nome no Cartão</label>
                            <Input placeholder="NOME COMPLETO" />
                          </div>
                        </div>

                        <div className="bg-muted/30 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Informações Importantes</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Após o pagamento, seu evento será enviado para aprovação pela nossa equipe.</li>
                            <li>• O processo de aprovação pode levar até 48 horas.</li>
                            <li>• Você receberá uma notificação por email quando seu evento for aprovado.</li>
                            <li>• Em caso de rejeição, você receberá um reembolso integral.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={currentStep === 1 ? () => navigate("/eventos") : handlePrevStep}
                  >
                    {currentStep === 1 ? "Cancelar" : "Voltar"}
                  </Button>

                  <Button
                    onClick={currentStep === 3 ? handleSubmit : handleNextStep}
                    className="bg-gradient-to-r from-piercing-purple to-piercing-pink"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
                        Processando...
                      </>
                    ) : currentStep === 3 ? (
                      "Finalizar e Pagar"
                    ) : (
                      "Próximo: " + (currentStep === 1 ? "Escolher Plano" : "Pagamento")
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
