import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

interface Ad {
  id: string;
  image: string;
  title: string;
  link?: string;
}

interface AdCarouselProps {
  ads?: Ad[];
}

const defaultAds: Ad[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1622298760148-0f9c81f4a101?q=80&w=2070&auto=format&fit=crop",
    title: "Anúncio 1 - Espaço Disponível",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1612371636004-04df25c9f51d?q=80&w=2070&auto=format&fit=crop",
    title: "Anúncio 2 - Espaço Disponível",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1581743525371-1d03b65cebb2?q=80&w=2071&auto=format&fit=crop",
    title: "Anúncio 3 - Espaço Disponível",
  },
];

export default function AdCarousel({ ads = defaultAds }: AdCarouselProps) {
  return (
    <div className="w-full bg-muted/30 py-4">
      <div className="container">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {ads.map((ad) => (
              <CarouselItem key={ad.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <a 
                    href={ad.link || "#"} 
                    className="block aspect-[16/9] overflow-hidden relative group"
                    target={ad.link ? "_blank" : undefined}
                    rel={ad.link ? "noopener noreferrer" : undefined}
                  >
                    <img 
                      src={ad.image} 
                      alt={ad.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium">{ad.title}</p>
                      </div>
                    </div>
                  </a>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
}
