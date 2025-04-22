"use client";

import React from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { useAnimations } from "../animations";
import { spaceMono } from "@/lib/fonts";
import { services, testimonials, socialLinks } from "@/types/data";
import { MessageCircleMoreIcon, CopyrightIcon } from "lucide-react";
import { AnimatedImageZoomOut } from "../animations/animated-image-zoom-out";
import { ContactModal } from "../modals/contact-modal";
import ParallaxImageTrack from "../ParallaxImageTrack";
import { ServiceCard } from "../service-card";
import { TestimonialsGrid } from "../testimonials-grid";
import Hero from "./hero";
import AboutUsImage from "@/public/assets/about-us.png";
import { Navbar } from "../navbar";

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
              gsap.to(el, {
                scale: 45,
                duration: 1.5,
                ease: "power4.inOut",
                delay: delays[i],
                onComplete: () => {
                  if (i === delays.length - 1) {
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
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "scale(0)" }}
          >
            <path
              d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
              className="fill-white dark:fill-black"
            />
          </svg>
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
          <Hero setIsContactOpen={setIsContactOpen} />

          {/* About Section */}
          <section id="about" className="py-16 md:py-24">
            <div className="custom-container">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl">
                    About Us
                  </h2>
                  <p className="text-muted-foreground mb-4 text-lg">
                    At BaseRock Technologies, we blend technical expertise with
                    clear communication to bring your vision to life. Led by
                    Sahithya, our freelance-powered team delivers quality-first
                    results in development, design, writing, and digital
                    management.
                  </p>
                  <p className="text-muted-foreground text-lg">We value:</p>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6 text-lg">
                    <li>Fast, clear communication</li>
                    <li>Attention to every detail</li>
                    <li>Client-first, goal-driven process</li>
                    <li>Empathy, trust, and consistency</li>
                  </ul>
                  <p className="text-muted-foreground text-lg">
                    We combine technical skills with people skills — so working
                    with us feels easy, not overwhelming.
                  </p>
                  <p className="text-muted-foreground mt-4 text-lg font-semibold">
                    Your idea deserves a partner who listens, thinks, and
                    executes. That&apos;s us.
                  </p>
                </div>
                <AnimatedImageZoomOut
                  src={AboutUsImage}
                  alt="About Us"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="services-section py-16 md:py-24">
            <div className="custom-container">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
                Our Services
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects">
            <ParallaxImageTrack />
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="bg-background py-16 md:py-24">
            <div className="custom-container">
              <div className="mb-12 flex flex-col items-center justify-center text-center">
                <div className="bg-primary relative mb-4 flex w-fit items-center justify-center gap-1 rounded-lg rounded-bl-none px-4 py-1 ">
                  <MessageCircleMoreIcon size={20} className="text-white" />
                  <h1 className=" text-sm text-white">testimonials</h1>
                </div>
                <h2 className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl">
                  What Clients Say
                </h2>
              </div>
              <TestimonialsGrid testimonials={testimonials} />
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-theme-card relative w-full text-white transition-colors duration-200">
            <div className="custom-container mx-auto px-4 py-12">
              <div className="mb-8 flex justify-center gap-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="text-primary h-6 w-6 dark:text-white" />
                  </a>
                ))}
              </div>
              <div className="group relative flex items-center justify-center gap-1 text-center text-sm text-gray-400">
                <CopyrightIcon
                  className="group-hover:text-primary text-primary dark:text-white"
                  size={20}
                />{" "}
                {new Date().getFullYear()}
                <h1>BaseRock Technologies. All rights reserved.</h1>
              </div>
            </div>
          </footer>

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
