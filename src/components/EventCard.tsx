
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  location: string;
  date: Date;
  image: string;
  category: string;
}

export default function EventCard({ id, title, location, date, image, category }: EventCardProps) {
  const formattedDistance = formatDistanceToNow(date, { addSuffix: true, locale: ptBR });

  return (
    <Link 
      to={`/eventos/${id}`} 
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 block"
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
          {category}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold leading-tight mb-1 line-clamp-2">{title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 flex-shrink-0">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="truncate">{location}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{formattedDistance}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Ver detalhes</span>
        </div>
      </div>
    </Link>
  );
}
