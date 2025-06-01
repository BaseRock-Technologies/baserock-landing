import { SplineIcon, Spline } from "lucide-react";
import React from "react";
import { ServiceCard } from "../service-card";
import { services } from "@/types/data";
import { AnimatedTextFill } from "../animations/animated-text-fill";

const Services = () => {
  return (
    <section
      id="services"
      className="services-section relative flex w-full justify-center py-16 md:py-24"
    >
      <div className="custom-container relative w-full space-y-6 overflow-hidden">
        <AnimatedTextFill className="mb-12 text-center max-sm:pr-6">
          Find the service you need
        </AnimatedTextFill>
        <div className="relative mt-auto max-w-xs translate-y-0 sm:absolute sm:right-2 md:right-[10%] lg:right-1/4 lg:max-w-sm lg:translate-y-24">
          <p className="relative">
            <SplineIcon className="text-helper absolute -top-8 left-0 rotate-90" />
            <span className="bg-primary leading-relaxed text-white">
              It doesn&apos;t matter whether you know where to start or not, we
              will always point you in the right direction.
            </span>
          </p>
        </div>
        <div className="relative flex h-full w-full flex-1 flex-col gap-4 sm:mt-[25%] sm:flex-col sm:gap-0 md:mt-[23%]">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              position={index}
            />
          ))}
          <div className="from-background via-background  absolute bottom-0 hidden h-[25.9722vw] w-full origin-bottom -translate-y-[26.9722vw] items-end justify-center bg-gradient-to-t to-transparent md:flex">
            <div className="text-invert-backgroud flex flex-col items-center justify-center gap-2">
              <Spline className="text-helper" />
              <p className="relative max-w-sm text-center text-sm">
                We provide our partners with exceptional digital solutions that
                bring strategic value and meke their.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
