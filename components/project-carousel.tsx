"use client";

import * as React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Project } from "@/lib/types";
import ProjectPlaceholder from "@/public/assets/projects-placeholder.jpg";
import ProjectCard from "./project-card";

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("resize", () => {
      console.log(api);
      setCount(api.scrollSnapList().length);
      api.scrollTo(0, true);
      setCurrent(1);
    });
  }, [api]);

  return (
    <div className="px-12">
      <Carousel
        setApi={setApi}
        className="w-full max-sm:max-w-sm"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {Array.from({ length: projects.length }).map((_, slideIndex) => (
            <CarouselItem
              key={slideIndex}
              className="pl-8 md:basis-1/2 lg:basis-1/3"
            >
              <ProjectCard
                key={slideIndex}
                imageUrl={
                  projects[slideIndex].image
                    ? projects[slideIndex].image
                    : ProjectPlaceholder
                }
                title={projects[slideIndex].title}
                description={projects[slideIndex].description}
                link={
                  projects[slideIndex].link ? projects[slideIndex].link : "/"
                }
                technologies={projects[slideIndex].technologies}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-full left-[25%] mt-16 cursor-pointer" />
        <CarouselNext className="top-full right-[25%] mt-16 cursor-pointer" />
      </Carousel>
      <div className="mt-16 flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${index === current - 1 ? "bg-primary" : "bg-muted"}`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
