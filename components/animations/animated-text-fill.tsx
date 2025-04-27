"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextFillProps {
  children: React.ReactNode;
  className?: string;

  align?: "left" | "center" | "right";
}

export function AnimatedTextFill({
  children,
  className = "",
  align = "center",
}: AnimatedTextFillProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Split the text into individual characters
    const textContent = text.textContent || "";
    text.innerHTML = textContent
      .split("")
      .map((char) => `<span class="text-fill-char">${char}</span>`)
      .join("");

    const chars = text.querySelectorAll(".text-fill-char");

    // Set initial state
    gsap.set(chars, {
      opacity: 0,
      y: 20,
    });

    // Create animation
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.01,
      stagger: 0.01,
      ease: "power2.out",
      scrollTrigger: {
        trigger: text,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const alignClass =
    align === "left"
      ? "justify-start"
      : align === "right"
        ? "justify-end"
        : "justify-center";

  return (
    <div className={cn("flex items-center justify-center", alignClass)}>
      <div className="relative w-fit">
        <h2
          ref={textRef}
          className={cn(
            "relative z-20 mb-6 text-center text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl",
            className,
          )}
        >
          {children}
        </h2>
        <h2
          className={cn(
            "absolute top-0 left-0 z-10 mb-6 text-center text-3xl font-bold tracking-tighter text-white/20 md:text-4xl lg:text-5xl",
            className,
          )}
        >
          {children}
        </h2>
      </div>
    </div>
  );
}
