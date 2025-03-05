"use client";

import * as React from "react";
import {
  Carousel,
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 lg:gap-14">
                {projects
                  .slice(slideIndex * 3, slideIndex * 3 + 3)
                  .map((project, index) => (
                    <ProjectCard
                      key={index}
                      imageUrl={
                        project.image ? project.image : ProjectPlaceholder
                      }
                      title={project.title}
                      description={project.description}
                      link={project.link ? project.link : "/"}
                      technologies={project.technologies}
                    />
                  ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-full left-[25%] mt-16 cursor-pointer" />
        <CarouselNext className="top-full right-[25%] mt-16 cursor-pointer" />
      </Carousel>
      <div className="mt-16 flex justify-center gap-2">
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
