"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { spaceMono } from "@/lib/fonts";
import ProjectCarousel from "@/components/project-carousel";
import { Navbar } from "@/components/navbar";
import { services, projects, testimonials, socialLinks } from "@/lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AnimatedText } from "@/components/animations/animated-text";
import { useAnimations } from "@/components/animations";
import { ServiceCard } from "@/components/service-card";
import { TestimonialsGrid } from "@/components/testimonials-grid";
import { AnimatedImageZoom } from "@/components/animations/animated-image-zoom";

// Images
import BannerImage from "@/public/assets/banner.png";
import AboutUsImage from "@/public/assets/about-us.png";
import { AnimatedImageZoomOut } from "@/components/animations/animated-image-zoom-out";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function Page() {
  useAnimations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center ${spaceMono.className}`}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="bg-background text-foreground relative flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full">
          <AnimatedImageZoom src={BannerImage} alt="Banner" />
          <div className="absolute inset-0 bg-black/80"></div>
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
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Contact Us
            </Button>
            <Button size="lg" variant="outline">
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
      <section className="bg-background py-16 md:py-24">
        <div className="custom-container">
          <div className="mb-12 text-center">
            <div className="bg-primary text-primary-foreground mb-4 inline-block rounded-full px-4 py-1 text-sm">
              testimonials
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

      {/* Contact Section */}
      <section id="contact" className="overflow-hidden py-16 md:py-24">
        <div className="custom-container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Ready to transform your business? Contact us today for a free
                consultation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-primary h-5 w-5" />
                  <span>contact@techconsulting.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-primary h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-primary h-5 w-5" />
                  <span>123 Business Ave, Tech City, TC 12345</span>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" {...register("name")} />
                        {errors.name && (
                          <p className="text-xs text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && (
                          <p className="text-xs text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" {...register("subject")} />
                      {errors.subject && (
                        <p className="text-xs text-red-500">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        className="min-h-[120px]"
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500">
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full  bg-slate-900 text-white">
        <div className="custom-container mx-auto px-4 py-12">
          <div className="mb-8 flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="transition-colors hover:text-blue-400"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Tech Consulting. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
