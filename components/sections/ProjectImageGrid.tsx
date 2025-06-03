import React, { useRef } from "react";
import { Project } from "@/types/types";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

interface ProjectImageGridProps {
  project: Project;
}

const ProjectImageGrid = ({ project }: ProjectImageGridProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Register plugins
    gsap.registerPlugin(SplitText, ScrollToPlugin);

    // Split the title text
    const splitTitle = new SplitText(titleRef.current, { type: "chars,words" });

    // Initial state for title
    gsap.set(splitTitle.chars, {
      y: 100,
      opacity: 0,
    });

    // Set initial opacity of title to 1 so we can see the characters
    gsap.set(titleRef.current, {
      opacity: 1,
    });

    // Initial state for images
    gsap.set(".project-image", {
      scale: 0,
      opacity: 0,
    });

    // Ensure numbers are hidden initially
    gsap.set(".project-image-number", { opacity: 0 });

    // Create the animation timeline
    const tl = gsap.timeline();

    // Animate title characters
    tl.to(splitTitle.chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.02,
      ease: "power4.out",
    });

    // Hide the title after animation
    tl.to(
      titleRef.current,
      {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
        onComplete: () => {
          if (titleRef.current) titleRef.current.style.display = "none";
        },
      },
      "+=0.2",
    );

    // Fade in numbers after title disappears
    tl.to(".project-image-number", {
      opacity: 1,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Animate images with stagger and delay
    tl.to(
      ".project-image",
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.25,
      },
      "+=0.2",
    );

    // Cleanup
    return () => {
      splitTitle.revert();
    };
  }, []);

  return (
    <section
      id="projectImageGrid"
      className="relative flex w-full flex-col items-center justify-center"
    >
      <div className="breaker relative flex min-h-screen w-full flex-col items-center justify-center">
        <h1
          ref={titleRef}
          className="text-foreground font-anton absolute top-1/2 left-1/2 h-screen w-full -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-bold opacity-0 md:text-8xl lg:text-9xl"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          {project.title}
        </h1>
        <div
          ref={imagesRef}
          className="relative grid h-full w-full max-w-full grid-cols-1 pt-24 md:max-w-5xl lg:grid-cols-2 lg:pt-12"
        >
          {project.images.map((img, index) => (
            <div
              key={img.id}
              className="relative flex h-full w-full items-start justify-center gap-3 overflow-hidden p-6"
            >
              <h2
                className="project-image-number text-foreground hidden text-lg font-bold lg:flex"
                style={{ opacity: 0 }}
              >
                {index + 1}.
              </h2>
              <Image
                src={img.image}
                alt={`${project.title} - Image ${index + 1}`}
                className="project-image  aspect-video h-full w-full object-cover opacity-0 grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectImageGrid;
