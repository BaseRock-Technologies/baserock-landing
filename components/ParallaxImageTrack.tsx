"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
import { projectSliderData } from "@/types/data";
import { Project } from "@/types/types";
import { AnimatedTextFill } from "./animations/animated-text-fill";
import { useScreenSize } from "@/hooks/use-mobile";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { FastAverageColor } from "fast-average-color";
import { useRouter } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImageTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useScreenSize();
  const [bgColors, setBgColors] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fac = new FastAverageColor();

    const getImageColors = async () => {
      const colors = await Promise.all(
        imagesRef.current.map(async (img) => {
          if (!img || !img.complete) return "rgba(var(--primary-rgb), 0.35)";
          try {
            const color = await fac.getColor(img);
            return `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.8)`;
          } catch (e) {
            console.error("Error getting color:", e);
            return "rgba(var(--primary-rgb), 0.35)";
          }
        }),
      );
      setBgColors(colors);
    };

    // Wait for all images to load before getting colors
    const loadImages = async () => {
      const imagePromises = imagesRef.current.map((img) => {
        if (!img) return Promise.resolve();
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(null);
          } else {
            img.onload = () => resolve(null);
            img.onerror = () => resolve(null);
          }
        });
      });

      await Promise.all(imagePromises);
      await getImageColors();
    };

    loadImages();
  }, []);

  useGSAP(() => {
    if (!trackRef.current || !sectionRef.current) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    const images = imagesRef.current;

    const cardWidth = 160;
    const gap = 16;
    const totalWidth = (cardWidth + gap) * images.length;
    const windowWidth = window.innerWidth;

    // Hide the track initially
    gsap.set(track, {
      x: windowWidth,
      opacity: 0,
    });

    // Smooth reveal
    gsap.to(track, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=500%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Timeline for scroll-based animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=500%",
        scrub: true,
      },
    });

    // Move track from right to left
    tl.to(
      track,
      {
        x: -1.15 * totalWidth,
        ease: "power1.inOut",
      },
      0,
    );

    // Add parallax effect to each image
    images.forEach((image) => {
      tl.to(
        image,
        {
          objectPosition: "50% center",
          ease: "power1.inOut",
        },
        0,
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle card click
  const handleCardClick = (project: Project) => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      <section
        id="projects"
        ref={sectionRef}
        className="from-background/50 to-primary/30 relative h-full w-full overflow-hidden bg-gradient-to-t pt-28 lg:min-h-screen"
      >
        <div className="breaker">
          <AnimatedTextFill align="center">
            Real Projects. Real Impact.
          </AnimatedTextFill>
          <p className="text-muted-foreground mb-16 text-center text-lg">
            From SaaS Products to personal brands that shine — our work speaks
            for itself.
          </p>
        </div>
        {isMobile ? (
          <div className="breaker relative flex h-full w-full flex-col items-center justify-start gap-4">
            {projectSliderData.map((project, index) => (
              <div
                className="h-96 w-40 cursor-pointer overflow-hidden rounded-md object-cover shadow-lg brightness-75 transition-all duration-300 hover:brightness-100"
                key={index}
                onClick={() => handleCardClick(project)}
              >
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                  )}
                  style={{
                    backgroundColor: bgColors[index],
                  }}
                ></div>
                <Image
                  ref={(el) => {
                    imagesRef.current[index] = el!;
                  }}
                  src={project.images[0].image}
                  alt={`Image ${index + 1}`}
                  draggable={false}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  loading="eager"
                  style={{
                    objectPosition: "0% center",
                    transform: "scale(1.2)",
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={trackRef}
            className="relative flex w-full items-center justify-center gap-4 px-4"
          >
            {projectSliderData.map((project, index) => (
              <div
                key={index}
                className="h-96 w-40 cursor-pointer overflow-hidden rounded-md object-cover shadow-lg brightness-95 transition-all duration-300 hover:brightness-100"
                onClick={() => handleCardClick(project)}
              >
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                  )}
                  style={{
                    backgroundColor: bgColors[index],
                  }}
                ></div>
                <Image
                  ref={(el) => {
                    imagesRef.current[index] = el!;
                  }}
                  src={project.images[0].image}
                  alt={`Image ${index + 1}`}
                  draggable={false}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    objectPosition: "0% center", // Start from left side
                  }}
                  priority
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </ReactLenis>
  );
}
