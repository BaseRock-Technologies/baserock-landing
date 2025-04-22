"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
import ImageDialog from "./ImageDialog";
import { projectSliderData } from "@/types/data";
import { Project } from "@/types/types";
gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImageTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!trackRef.current || !sectionRef.current || !isLoaded) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    const images = imagesRef.current;

    const cardWidth = 288;
    const gap = 32;
    const totalWidth = (cardWidth + gap) * images.length;
    const windowWidth = window.innerWidth;

    // Hide the track initially and then reveal it smoothly
    gsap.set(track, {
      x: windowWidth,
      opacity: 0,
    });

    // Smoothly reveal the track
    gsap.to(track, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=500%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=500%",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;

        // Calculate the x position for the track to move from right to left
        const x = windowWidth - progress * (totalWidth + windowWidth);

        gsap.to(track, {
          x: x,
          duration: 0.1,
          ease: "power2.inOut",
        });

        // Enhanced parallax effect with different speeds for each image
        images.forEach((image) => {
          const parallaxStrength = 1.25;

          // Start at 0% and move to 100% * strength as we scroll
          const parallaxX = progress * 100 * parallaxStrength;

          gsap.to(image, {
            objectPosition: `${parallaxX}% center`,
            duration: 0.1,
            ease: "power2.inOut",
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoaded]);

  // Handle card click
  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 0.8,
      }}
    >
      <div
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden pt-28"
      >
        <div className="custom-container">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
            Real Projects. Real Impact.
          </h2>
          <p className="text-muted-foreground mb-16 text-center text-lg">
            From SaaS Products to personal brands that shine — our work speaks
            for itself.
          </p>
        </div>
        <div
          ref={trackRef}
          className="relative flex w-full items-center justify-center gap-8 px-4"
          style={{ visibility: isLoaded ? "visible" : "hidden" }}
        >
          {projectSliderData.map((project, index) => (
            <Image
              key={index}
              ref={(el) => {
                imagesRef.current[index] = el!;
              }}
              onClick={() => handleCardClick(project)}
              src={project.images[0].image}
              alt={`Image ${index + 1}`}
              className="h-96 w-72 cursor-pointer object-cover shadow-lg brightness-75 transition-all duration-300 hover:brightness-100 "
              draggable={false}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectPosition: "0% center", // Start from left side
              }}
              onLoad={
                index === projectSliderData.length - 1
                  ? () => setIsLoaded(true)
                  : undefined
              }
            />
          ))}
        </div>
      </div>
      {/* Dialog */}
      <ImageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={selectedProject?.title}
        images={selectedProject?.images}
      />
    </ReactLenis>
  );
}
