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
                <img 
                  src={ad.image} 
                  alt={ad.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
