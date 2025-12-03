import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Ad {
  id: string;
  image?: string;
  title: string;
  description?: string;
  link?: string;
}

interface AdCarouselProps {
  ads?: Ad[];
}

const defaultAds: Ad[] = [
  {
    id: "1",
    title: "📢 Divulgue seu evento aqui!",
    description: "Entre em contato e anuncie para milhares de piercers",
  },
  {
    id: "2",
    title: "🎯 Espaço para publicidade",
    description: "Alcance seu público-alvo na comunidade de piercing",
  },
  {
    id: "3",
    title: "✨ Anuncie sua marca",
    description: "Conecte-se com profissionais do body piercing",
  },
];

export default function AdCarousel({ ads = defaultAds }: AdCarouselProps) {
  return (
    <div className="w-full bg-background">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {ads.map((ad) => (
            <CarouselItem key={ad.id} className="basis-full">
              <a 
                href={ad.link || "#"} 
                className="block aspect-[21/9] md:aspect-[32/9] overflow-hidden relative group"
                target={ad.link ? "_blank" : undefined}
                rel={ad.link ? "noopener noreferrer" : undefined}
              >
                {ad.image ? (
                  <>
                    <img 
                      src={ad.image} 
                      alt={ad.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-muted via-muted/80 to-muted flex flex-col items-center justify-center border-2 border-dashed border-border/50 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-muted/90">
                    <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2 transition-colors group-hover:text-primary">
                      {ad.title}
                    </h3>
                    {ad.description && (
                      <p className="text-sm md:text-lg text-muted-foreground text-center px-4">
                        {ad.description}
                      </p>
                    )}
                  </div>
                )}
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 h-12 w-12 border-2 bg-background/80 backdrop-blur-sm hover:bg-background" />
        <CarouselNext className="right-4 h-12 w-12 border-2 bg-background/80 backdrop-blur-sm hover:bg-background" />
      </Carousel>
    </div>
  );
}
