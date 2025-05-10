
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Por favor, informe um email válido.");
      return;
    }
    
    toast.success("Inscrição realizada com sucesso!");
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background/50 py-12 mt-auto">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6">
        <div>
          <Link to="/" className="inline-block mb-4">
            <span className="text-2xl font-bold text-gradient">Piercer Go</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-4">
            A plataforma para a comunidade de body piercing conectar-se, descobrir eventos e compartilhar experiências.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>
        <div className="md:mx-auto">
          <h3 className="font-semibold mb-3">Links Úteis</h3>
          <ul className="space-y-2">
            <li><Link to="/eventos" className="text-muted-foreground hover:text-primary">Todos os Eventos</Link></li>
            <li><Link to="/avaliacoes" className="text-muted-foreground hover:text-primary">Avaliações</Link></li>
            <li><Link to="/planos" className="text-muted-foreground hover:text-primary">Nossos Planos</Link></li>
            <li><Link to="/cadastro" className="text-muted-foreground hover:text-primary">Cadastrar Evento/Loja</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Inscreva-se para receber atualizações sobre eventos em sua região.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex">
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              className="bg-muted border border-border rounded-l-md px-3 py-2 w-full outline-none focus:ring-1 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-primary rounded-r-md px-4 py-2 hover:bg-primary/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </form>
        </div>
      </div>
      <div className="container border-t border-border mt-8 pt-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Piercer Go. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link to="/termos" className="text-sm text-muted-foreground hover:text-primary">Termos de Uso</Link>
            <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-primary">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
