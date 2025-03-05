"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Project } from "@/lib/types";
import ProjectPlaceholder from "@/public/assets/projects-placeholder.jpg";

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const totalSlides = Math.ceil(projects.length / 3);

  return (
    <div className="px-12">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <CarouselItem key={slideIndex}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {projects
                  .slice(slideIndex * 3, slideIndex * 3 + 3)
                  .map((project, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={
                            project.image ? project.image : ProjectPlaceholder
                          }
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="mb-2 text-lg font-semibold">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          {project.description}
                        </p>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-full left-[25%] translate-y-4 cursor-pointer" />
        <CarouselNext className="top-full right-[25%] translate-y-4 cursor-pointer" />
      </Carousel>
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${index === current ? "bg-primary" : "bg-muted"}`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
