"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useAnimations() {
  useEffect(() => {
    // Animate service cards
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll(".testimonial-card")
    testimonialCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    // Animate contact form
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      gsap.fromTo(
        contactForm,
        {
          x: "100%",
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactForm,
            start: "top center+=200",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])
}

