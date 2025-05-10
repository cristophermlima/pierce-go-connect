
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gradient">Piercer Go</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-foreground md:hidden"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          )}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/eventos" className="text-lg font-medium hover:text-primary transition-colors">
            Agenda
          </Link>
          <Link to="/avaliacoes" className="text-lg font-medium hover:text-primary transition-colors">
            Score Piercing
          </Link>
          <Link to="/viagens" className="text-lg font-medium hover:text-primary transition-colors">
            Viagens
          </Link>
          <Link to="/fornecedores" className="text-lg font-medium hover:text-primary transition-colors">
            Fornecedores
          </Link>
          <Link to="/login" className="text-lg font-medium hover:text-primary transition-colors">
            Entrar
          </Link>
          <Link to="/cadastro">
            <Button className="button-glow bg-gradient-to-r from-piercing-purple to-piercing-pink">
              Cadastrar
            </Button>
          </Link>
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b border-border md:hidden animate-fade-in">
            <div className="flex flex-col py-4 px-4 space-y-4">
              <Link 
                to="/eventos"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-lg hover:bg-muted rounded-md"
              >
                Agenda
              </Link>
              <Link 
                to="/avaliacoes"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-lg hover:bg-muted rounded-md"
              >
                Score Piercing
              </Link>
              <Link 
                to="/viagens"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-lg hover:bg-muted rounded-md"
              >
                Viagens
              </Link>
              <Link 
                to="/fornecedores"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-lg hover:bg-muted rounded-md"
              >
                Fornecedores
              </Link>
              <Link 
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-lg hover:bg-muted rounded-md"
              >
                Entrar
              </Link>
              <Link 
                to="/cadastro"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
