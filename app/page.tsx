"use client";
import { CopyrightIcon, MessageCircleMoreIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { spaceMono } from "@/lib/fonts";
import ProjectCarousel from "@/components/project-carousel";
import { Navbar } from "@/components/navbar";
import { services, projects, testimonials, socialLinks } from "@/lib/data";
import { AnimatedText } from "@/components/animations/animated-text";
import { useAnimations } from "@/components/animations";
import { ServiceCard } from "@/components/service-card";
import { TestimonialsGrid } from "@/components/testimonials-grid";
import { AnimatedImageZoom } from "@/components/animations/animated-image-zoom";

// Images
import BannerImage from "@/public/assets/banner.png";
import AboutUsImage from "@/public/assets/about-us.png";
import { AnimatedImageZoomOut } from "@/components/animations/animated-image-zoom-out";
import { useState } from "react";
import { ContactModal } from "@/components/modals/contact-modal";

export default function Page() {
  useAnimations();

  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center ${spaceMono.className}`}
    >
      <Navbar
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        setContactOpen={setIsContactOpen}
      />

      {/* Hero Section */}
      <section className="bg-background text-foreground relative flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full">
          <AnimatedImageZoom src={BannerImage} alt="Banner" />
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="custom-container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center">
          <AnimatedText className="mb-6 text-5xl font-bold tracking-tighter text-white  sm:text-6xl md:text-7xl lg:text-8xl">
            Transforming Business Through Technology
          </AnimatedText>
          <AnimatedText
            className="text-muted-foreground mx-auto mb-8 max-w-2xl text-sm sm:text-xl"
            delay={0.3}
          >
            We help businesses navigate the digital landscape with innovative IT
            solutions and strategic consulting services.
          </AnimatedText>
          <div className="flex justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 cursor-pointer text-white"
              onClick={() => setIsContactOpen(true)}
            >
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer"
              onClick={() => scrollToSection("services")}
            >
              Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="custom-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl">
                About Us
              </h2>
              <p className="text-muted-foreground mb-4 text-lg">
                With over a decade of experience in IT consulting, we&apos;ve
                helped hundreds of businesses achieve their digital
                transformation goals. Our team of experts brings together deep
                industry knowledge and technical expertise to deliver solutions
                that drive real business value.
              </p>
              <p className="text-muted-foreground text-lg">
                We believe in building long-term partnerships with our clients,
                understanding their unique challenges, and delivering tailored
                solutions that help them stay ahead in today&apos;s competitive
                landscape.
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
            Featured Projects
          </h2>
          <ProjectCarousel projects={projects} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-background py-16 md:py-24">
        <div className="custom-container">
          <div className="mb-12 flex flex-col items-center justify-center text-center">
            <div className="bg-primary relative mb-4 flex w-fit items-center justify-center gap-1 rounded-lg rounded-bl-none px-4 py-1 ">
              <MessageCircleMoreIcon size={20} />
              <h1 className=" text-sm text-white">testimonials</h1>
            </div>
            <h2 className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl">
              Public cheer for Us!
            </h2>
            <p className="text-muted-foreground mt-2">
              Find out how our users spreading the word
            </p>
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
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <div className="group relative flex items-center justify-center gap-1 text-center text-sm text-gray-400">
            <CopyrightIcon
              className="group-hover:text-primary text-white"
              size={20}
            />{" "}
            {new Date().getFullYear()}
            <h1>Tech Consulting. All rights reserved.</h1>
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
  );
}
