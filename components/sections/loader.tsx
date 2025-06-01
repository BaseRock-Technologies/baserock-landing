"use client";

import React from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { useAnimations } from "../animations";
import { spaceMono } from "@/lib/fonts";
import { ContactModal } from "../modals/contact-modal";
import ParallaxImageTrack from "../ParallaxImageTrack";
import Hero from "./hero";
import { Navbar } from "../navbar";
import Services from "./services";
import Testimonials from "./testimonials";
import Footer from "./footer";
import ContactUs from "./contactus";
import Team from "./team";
const Loader = () => {
  const landingRef = React.useRef<HTMLDivElement>(null);
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const counterElement = React.useRef<HTMLDivElement>(null);
  const counter = React.useRef<HTMLParagraphElement>(null);

  useAnimations();
  const [isContactOpen, setIsContactOpen] = React.useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isLoaderComplete, setIsLoaderComplete] =
    React.useState<boolean>(false);

  useGSAP(() => {
    function startLoader() {
      if (!counterElement.current) return;

      let currentValue = 0;

      function updateCounter() {
        if (currentValue < 100 && counterElement.current && counter.current) {
          const increment = Math.floor(Math.random() * 10) + 1;
          currentValue = Math.min(currentValue + increment, 100);
          counter.current.textContent = currentValue.toString();

          const delay = Math.floor(Math.random() * 200) + 25;
          setTimeout(updateCounter, delay);
        } else if (currentValue === 100) {
          counterElement.current?.remove();
          // Start revealer animations immediately when counter reaches 100
          setIsLoaderComplete(true);
        }
      }

      updateCounter();
    }

    startLoader();

    const textWrapper = document.querySelector<HTMLParagraphElement>(".ml16");
    if (textWrapper && textWrapper.textContent) {
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class={cn('letter', 'inline-block leading-4')}>$&</span>",
      );
    }

    const timeline = gsap.timeline({ loop: false });

    // Initial counter fade out
    timeline.to(
      ".count",
      {
        opacity: 0,
        duration: 0.25,
      },
      "+=3.5",
    );

    // Text animation sequence
    timeline
      .to(".ml16 .letter", {
        y: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.03,
      })
      .to(
        ".ml16 .letter",
        {
          y: 100,
          duration: 3,
          ease: "expo.out",
          stagger: 0.03,
        },
        "+=2",
      );
  }, [landingRef, loaderRef, counter, counterElement]);

  return (
    <div className="relative min-h-screen w-screen" ref={landingRef}>
      <div
        className="absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden"
        ref={loaderRef}
      >
        <div
          ref={counterElement}
          className={cn(
            "bg-background relative z-50 flex h-full w-full items-center justify-center",
            "loader-content",
            "flex gap-2 text-black dark:text-white",
          )}
        >
          <div className="count">
            <p ref={counter}>0</p>
          </div>
          <div className={cn("copy", "text-3xl leading-4 uppercase")}>
            <p className="ml16">Baserock</p>
          </div>
        </div>
      </div>

      {isLoaderComplete && (
        <div
          className={cn(
            "relative flex min-h-screen w-full flex-col items-center justify-center",
            spaceMono.className,
          )}
        >
          <Navbar
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            setContactOpen={setIsContactOpen}
          />

          {/* Hero Section */}
          <Hero />

          {/* Team Section */}
          <Team />

          {/* Services Section */}
          <Services />

          {/* Projects Section */}
          <ParallaxImageTrack />

          {/* Testimonials Section */}
          <Testimonials />

          {/* Contact Us Section */}
          <ContactUs setIsContactOpen={setIsContactOpen} />

          {/* Footer */}
          <Footer />

          {isContactOpen && (
            <ContactModal
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Loader;
