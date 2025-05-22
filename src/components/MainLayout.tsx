
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className={`flex-1 pt-16 ${className || ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
