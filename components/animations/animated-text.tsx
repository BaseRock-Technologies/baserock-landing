"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
}

export function AnimatedText({ children, className = "", delay = 0 }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const text = textRef.current
    if (!text) return

    gsap.fromTo(
      text,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: text,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [delay])

  return (
    <div ref={textRef} className={`reveal-text ${className}`}>
      {children}
    </div>
  )
}

