import React from "react";
import { AnimatedImageZoomOut } from "../animations/animated-image-zoom-out";
import { AnimatedTextFill } from "../animations/animated-text-fill";
import AboutUsImage from "@/public/assets/about-us.png";

const AboutUs = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="custom-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <AnimatedTextFill align="left">About Us</AnimatedTextFill>
            <p className="text-muted-foreground mb-4 text-lg">
              At BaseRock Technologies, we blend technical expertise with clear
              communication to bring your vision to life. Led by Sahithya, our
              freelance-powered team delivers quality-first results in
              development, design, writing, and digital management.
            </p>
            <p className="text-muted-foreground text-lg">We value:</p>
            <ul className="text-muted-foreground mb-4 list-disc pl-6 text-lg">
              <li>Fast, clear communication</li>
              <li>Attention to every detail</li>
              <li>Client-first, goal-driven process</li>
              <li>Empathy, trust, and consistency</li>
            </ul>
            <p className="text-muted-foreground text-lg">
              We combine technical skills with people skills — so working with
              us feels easy, not overwhelming.
            </p>
            <p className="text-muted-foreground mt-4 text-lg font-semibold">
              Your idea deserves a partner who listens, thinks, and executes.
              That&apos;s us.
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
  );
};

export default AboutUs;
