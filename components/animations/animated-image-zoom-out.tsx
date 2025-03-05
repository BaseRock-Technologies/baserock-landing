"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedImageZoomOutProps {
  src: StaticImageData;
  alt?: string;
  className?: string;
  delay?: number;
  sizes?: string;
}

export function AnimatedImageZoomOut({
  src,
  alt = "Image",
  className = "",
  delay = 0,
  sizes = "100vw",
}: AnimatedImageZoomOutProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    gsap.fromTo(
      image,
      { scale: 1.5, transformOrigin: "center" },
      {
        scale: 1.0,
        duration: 1.5,
        ease: "power4.inOut",
        delay,
        scrollTrigger: {
          trigger: image,
          start: "top 95%",
          end: "top center",
          scrub: true,
        },
      },
    );
  }, [delay]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes={sizes}
        className="h-full w-full object-cover will-change-transform"
      />
    </div>
  );
}
