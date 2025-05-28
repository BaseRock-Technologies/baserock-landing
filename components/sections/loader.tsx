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
  const revealerLayerOneRef = React.useRef<SVGSVGElement>(null);
  const revealerLayerTwoRef = React.useRef<SVGSVGElement>(null);
  const revealerLayerThreeRef = React.useRef<SVGSVGElement>(null);

  useAnimations();
  const [isContactOpen, setIsContactOpen] = React.useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isLoaderComplete, setIsLoaderComplete] =
    React.useState<boolean>(false);

  useGSAP(() => {
    const revealers = [
      revealerLayerOneRef.current,
      revealerLayerTwoRef.current,
      revealerLayerThreeRef.current,
    ];
    // gsap.set(revealers, { scale: 0 });

    function startLoader() {
      const counterElement =
        document.querySelector<HTMLParagraphElement>(".count p");
      if (!counterElement) return;

      let currentValue = 0;

      function updateCounter() {
        if (currentValue < 100 && counterElement) {
          const increment = Math.floor(Math.random() * 10) + 1;
          currentValue = Math.min(currentValue + increment, 100);
          counterElement.textContent = currentValue.toString();

          const delay = Math.floor(Math.random() * 200) + 25;
          setTimeout(updateCounter, delay);
        } else if (currentValue === 100) {
          // Start revealer animations immediately when counter reaches 100
          const delays = [0, 0.5, 1];

          revealers.forEach((el, i) => {
            if (el) {
              const tl = gsap.timeline();
              tl.to(el, {
                scale: 45,
                duration: 1.5,
                ease: "power4.inOut",
                delay: delays[i],
              }).to(el, {
                opacity: 0,
                duration: 0.05,
                onComplete: () => {
                  if (i === delays.length - 2) {
                    loaderRef.current?.remove();
                    setIsLoaderComplete(true);
                    // Show content after all revealers are done
                  }
                },
              });
            }
          });
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
  }, [
    landingRef,
    loaderRef,
    revealerLayerOneRef,
    revealerLayerTwoRef,
    revealerLayerThreeRef,
  ]);

  return (
    <div className="relative min-h-screen w-screen" ref={landingRef}>
      <div
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-black"
        ref={loaderRef}
      >
        <div
          className={cn(
            "loader-content",
            "flex gap-2 text-black dark:text-white",
          )}
        >
          <div className="count">
            <p>0</p>
          </div>
          <div className={cn("copy", "flex-[6] text-3xl leading-4 uppercase")}>
            <p className="ml16">Baserock</p>
          </div>
        </div>

        <div
          className={cn(
            "revealer",
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          )}
        >
          <svg
            ref={revealerLayerOneRef}
            width="151"
            height="148"
            viewBox="0 0 151 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "scale(0)" }}
          >
            <path
              d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
              className="fill-black dark:fill-white"
            />
          </svg>
        </div>

        <div
          className={cn(
            "revealer",
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          )}
        >
          <svg
            ref={revealerLayerTwoRef}
            width="151"
            height="148"
            viewBox="0 0 151 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "scale(0)" }}
          >
            <path
              d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
              className="fill-primary"
            />
          </svg>
        </div>

        <div
          className={cn(
            "revealer",
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          )}
        >
          <svg
            ref={revealerLayerThreeRef}
            width="151"
            height="148"
            viewBox="0 0 151 148"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "scale(0)" }}
          >
            <defs>
              <mask id="starMask">
                <rect width="151" height="148" fill="white" />
                <path
                  d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
                  fill="none"
                  className="fill-black"
                />
              </mask>
            </defs>

            <rect
              width="151"
              height="148"
              fill="none"
              className="fill-black dark:fill-white"
              mask="url(#starMask)"
            />
          </svg>
        </div>
      </div>

      <Hero />

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
