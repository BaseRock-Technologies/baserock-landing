import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScreenSize } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isTablet, isMobile } = useScreenSize();

  useGSAP(() => {
    // Kill any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Initial state - cards are below the viewport
    gsap.set(cardsRef.current, {
      y: "200%",
      transformOrigin: "top center",
    });

    // Pin the section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=250%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Create a timeline for staggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });

    // Add each card to the timeline with a delay
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const getDelay = () => {
        if (isTablet || isMobile) {
          if (index === 0) return 0.05;
          if (index === 1) return 0.1;
          if (index === 2) return 0.15;
          return 0;
        }
        if (index === 0) return 0.05;
        if (index === 1) return 0.15;
        if (index === 2) return 0.1;
        return 0;
      };

      tl.to(
        card,
        {
          y: "-200%",
          duration: 1,
          ease: "power2.inOut",
        },
        getDelay(),
      );

      // Add dangling effect only if card has the dangle-card class
      if (card.classList.contains("dangle-card")) {
        gsap.to(card, {
          rotation: 5,
          x: 12,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });

        // Add reverse animation for balanced movement
        gsap.to(card, {
          rotation: -5,
          x: -12,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2 + 1,
        });
      }
    });
  }, [cardsRef, sectionRef, isMobile, isTablet]);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen w-full">
      <div
        className={cn(
          "custom-container relative z-10 mx-auto flex h-screen w-full items-center justify-center text-center",
        )}
      >
        <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2">
          <div className="relative flex items-center justify-center gap-2">
            <div className="bg-invert-background relative h-2 w-2"></div>
            <p className="text-invert-background font-bold">Our promise</p>
          </div>
          <h1 className="font-anton relative mb-6 w-full text-4xl font-bold text-white uppercase md:text-6xl lg:w-4/5 lg:text-8xl">
            Always the A team
          </h1>
        </div>
        <div className="relative grid h-full w-full grid-cols-1 grid-rows-3 place-items-center gap-16 lg:grid-cols-3 lg:grid-rows-1 xl:w-4/5">
          <div
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className="bg-primary relative z-30 flex h-96 w-full max-w-xs origin-top items-center justify-center rounded-md lg:w-full"
          ></div>
          <div
            ref={(el) => {
              cardsRef.current[1] = el;
            }}
            className={cn(
              "bg-primary relative z-20 flex h-96 w-full max-w-xs origin-top items-center justify-center rounded-md lg:w-full",
              "dangle-card",
            )}
          ></div>
          <div
            ref={(el) => {
              cardsRef.current[2] = el;
            }}
            className="bg-primary relative z-10 flex h-96 w-full max-w-xs origin-top items-center justify-center rounded-md lg:w-full"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Team;
