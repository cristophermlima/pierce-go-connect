
import { Input } from "@/components/ui/input";

interface EvaluationsSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function EvaluationsSearch({ searchQuery, setSearchQuery }: EvaluationsSearchProps) {
  return (
    <div className="relative mb-8">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="M21 21l-4.3-4.3"></path>
      </svg>
      <Input 
        className="pl-10 bg-muted border-none" 
        placeholder="Buscar eventos ou fornecedores..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default EvaluationsSearch;
