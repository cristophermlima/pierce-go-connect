import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

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
    title: "Divulgue seu evento aqui",
    description: "Entre em contato e anuncie para milhares de piercers",
  },
  {
    id: "2",
    title: "Espaço para publicidade",
    description: "Alcance seu público-alvo na comunidade de piercing",
  },
  {
    id: "3",
    title: "Anuncie sua marca",
    description: "Conecte-se com profissionais do body piercing",
  },
];

export default function AdCarousel({ ads = defaultAds }: AdCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full bg-background">
      <Carousel
        setApi={setApi}
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
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col items-center justify-center border border-border/30 transition-all duration-500 group-hover:from-primary/20 group-hover:to-accent/20">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight transition-all duration-300 group-hover:text-primary relative z-10">
                      {ad.title}
                    </h3>
                    {ad.description && (
                      <p className="text-sm md:text-base lg:text-lg text-muted-foreground text-center px-6 max-w-2xl relative z-10">
                        {ad.description}
                      </p>
                    )}
                    <div className="mt-4 px-6 py-2 border border-primary/30 rounded-full text-xs md:text-sm text-primary/80 transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/50 relative z-10">
                      Saiba mais
                    </div>
                  </div>
                )}
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 h-10 w-10 md:h-12 md:w-12 border bg-background/60 backdrop-blur-sm hover:bg-background/90 transition-all" />
        <CarouselNext className="right-4 h-10 w-10 md:h-12 md:w-12 border bg-background/60 backdrop-blur-sm hover:bg-background/90 transition-all" />
      </Carousel>
    </div>
  );
}
