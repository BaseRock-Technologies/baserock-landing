"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useContactFormAnimation() {
  useEffect(() => {
    const form = document.querySelector('[data-animate="slide-in"]')
    if (!form) return

    gsap.fromTo(
      form,
      {
        x: "100%",
      },
      {
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: form,
          start: "top center+=200",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [])
}

