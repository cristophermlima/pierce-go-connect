
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Calendar, MapPin, Star, FileText, CreditCard, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { href: "/eventos", label: "Agenda", icon: Calendar },
    { href: "/fornecedores", label: "Fornecedores", icon: MapPin },
    { href: "/avaliacoes", label: "Avaliações", icon: Star },
    { href: "/viagens", label: "Viagens", icon: FileText },
  ];

  const userMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: User },
    { href: "/agenda", label: "Minha Agenda", icon: Calendar },
    { href: "/perfil", label: "Perfil", icon: User },
    { href: "/planos", label: "Assinatura", icon: CreditCard },
  ];

  const NavItems = ({ mobile = false, onItemClick }: { mobile?: boolean; onItemClick?: () => void }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`${
            isActive(item.href)
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-primary"
          } transition-colors text-sm lg:text-base ${mobile ? "block py-2" : ""}`}
          onClick={onItemClick}
        >
          {mobile && <item.icon className="w-4 h-4 inline mr-2" />}
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container px-4 lg:px-6">
        <div className="flex h-14 lg:h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-piercing-purple to-piercing-pink rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg lg:text-xl bg-gradient-to-r from-piercing-purple to-piercing-pink bg-clip-text text-transparent">
              PierceConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <NavItems />
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {user ? (
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Link to="/cadastrar" className="hidden lg:block">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs lg:text-sm"
                  >
                    Cadastrar
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                        <AvatarFallback>
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-sm" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">{user.user_metadata?.full_name || "Usuário"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    {userMenuItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link to={item.href} className="flex items-center gap-2 cursor-pointer">
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Entrar</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-piercing-purple to-piercing-pink">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-piercing-purple to-piercing-pink rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-piercing-purple to-piercing-pink bg-clip-text text-transparent">
                      PierceConnect
                    </span>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                        Navegação
                      </h4>
                      <div className="space-y-1">
                        <NavItems mobile onItemClick={() => setIsOpen(false)} />
                      </div>
                    </div>

                    {user && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                          Minha Conta
                        </h4>
                        <div className="space-y-1">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <item.icon className="w-4 h-4" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                        Ações
                      </h4>
                      <Link
                        to="/cadastrar"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <FileText className="w-4 h-4 inline mr-2" />
                        Cadastrar Evento/Loja
                      </Link>
                    </div>
                  </div>

                  {/* Mobile auth section */}
                  <div className="border-t pt-4 mt-4">
                    {user ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                            <AvatarFallback>
                              {user.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {user.user_metadata?.full_name || "Usuário"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sair
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Entrar
                          </Button>
                        </Link>
                        <Link to="/register" onClick={() => setIsOpen(false)}>
                          <Button className="w-full bg-gradient-to-r from-piercing-purple to-piercing-pink">
                            Cadastrar-se
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
