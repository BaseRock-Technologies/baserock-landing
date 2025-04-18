"use client";
import { CopyrightIcon, MessageCircleMoreIcon } from "lucide-react";
import { spaceMono } from "@/lib/fonts";
import ProjectCarousel from "@/components/project-carousel";
import { Navbar } from "@/components/navbar";
import { services, projects, testimonials, socialLinks } from "@/types/data";
import { useAnimations } from "@/components/animations";
import { ServiceCard } from "@/components/service-card";
import { TestimonialsGrid } from "@/components/testimonials-grid";
import Loader from "@/components/sections/loader";
import { useState } from "react";
import { ContactModal } from "@/components/modals/contact-modal";

// Images

import AboutUsImage from "@/public/assets/about-us.png";
import { AnimatedImageZoomOut } from "@/components/animations/animated-image-zoom-out";
import Hero from "@/components/sections/hero";

export default function Page() {
  useAnimations();
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      {isLoaderComplete ? (
        <div
          className={`relative flex min-h-screen w-full flex-col items-center justify-center ${spaceMono.className}`}
        >
          {/* <Navbar
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            setContactOpen={setIsContactOpen}
          /> */}

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
          <section id="projects" className="py-16 md:py-24">
            <div className="custom-container">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
                Real Projects. Real Impact.
              </h2>
              <p className="text-muted-foreground mb-8 text-center text-lg">
                From SaaS Products to personal brands that shine — our work
                speaks for itself.
              </p>
              <ProjectCarousel projects={projects} />
            </div>
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
      ) : (
        <Loader onComplete={() => setIsLoaderComplete(true)} />
      )}
    </>
  );
}
