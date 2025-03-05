"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedImageZoomProps {
  src: StaticImageData;
  alt?: string;
  className?: string;
  delay?: number;
}

export function AnimatedImageZoom({
  src,
  alt = "Image",
  className = "",
  delay = 0,
}: AnimatedImageZoomProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    gsap.fromTo(
      image,
      { scale: 1 },
      {
        scale: 1.2,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: image,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, [delay]);

  return (
    <div
      ref={imageRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className="relative h-full w-full object-cover"
      />
    </div>
  );
}
