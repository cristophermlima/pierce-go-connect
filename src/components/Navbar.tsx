
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold text-gradient">Piercer Go</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-foreground md:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
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
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    {profile?.avatar_url ? (
                      <AvatarImage src={profile.avatar_url} alt={profile.full_name || ''} />
                    ) : (
                      <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium leading-none">{profile?.full_name || 'Usuário'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigateTo('/dashboard')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="9" x2="9" y1="21" y2="9"></line></svg>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateTo('/perfil')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateTo('/avaliacoes')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"></path><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                  Minhas Avaliações
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateTo('/viagens')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 7h2a1 1 0 0 0 1-1V5h2v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5h2v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5h1a1 1 0 0 1 1 1v4H3V7Z"></path><path d="M3 15v-3h18v3"></path><path d="M3 12v8a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8"></path></svg>
                  Minhas Viagens
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateTo('/planos')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M12 8v3"></path><path d="M12 16h.01"></path><path d="M6 16h.01"></path><path d="M18 16h.01"></path><path d="M18 11h.01"></path><path d="M6 11h.01"></path></svg>
                  Meu Plano
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" className="text-lg font-medium hover:text-primary transition-colors">
                Entrar
              </Link>
              <Link to="/cadastro">
                <Button className="button-glow bg-gradient-to-r from-piercing-purple to-piercing-pink">
                  Cadastrar
                </Button>
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b border-border md:hidden animate-fade-in">
            <nav className="flex flex-col py-4 px-4 space-y-4">
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
              
              {user ? (
                <>
                  <div className="px-4 py-2 border-t border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        {profile?.avatar_url ? (
                          <AvatarImage src={profile.avatar_url} alt={profile.full_name || ''} />
                        ) : (
                          <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                        )}
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{profile?.full_name || 'Usuário'}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mt-3">
                      <Link 
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="9" x2="9" y1="21" y2="9"></line></svg>
                        Dashboard
                      </Link>
                      <Link 
                        to="/perfil"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Meu Perfil
                      </Link>
                      <Link 
                        to="/avaliacoes"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"></path><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                        Minhas Avaliações
                      </Link>
                      <Link 
                        to="/viagens"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 7h2a1 1 0 0 0 1-1V5h2v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5h2v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5h1a1 1 0 0 1 1 1v4H3V7Z"></path><path d="M3 15v-3h18v3"></path><path d="M3 12v8a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8"></path></svg>
                        Minhas Viagens
                      </Link>
                      <Link 
                        to="/planos"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M12 8v3"></path><path d="M12 16h.01"></path><path d="M6 16h.01"></path><path d="M18 16h.01"></path><path d="M18 11h.01"></path><path d="M6 11h.01"></path></svg>
                        Meu Plano
                      </Link>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleSignOut}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Sair
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-center rounded-md border border-input"
                  >
                    Entrar
                  </Link>
                  <Link 
                    to="/cadastro"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-center rounded-md bg-gradient-to-r from-piercing-purple to-piercing-pink text-white"
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
