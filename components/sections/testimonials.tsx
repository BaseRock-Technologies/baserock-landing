import { MessageCircleMoreIcon } from "lucide-react";
import React from "react";
import { AnimatedTextFill } from "../animations/animated-text-fill";
import { testimonials } from "@/types/data";
import { TestimonialsGrid } from "../testimonials-grid";

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-background py-16 md:py-24">
      <div className="custom-container">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="bg-primary relative mb-4 flex w-fit items-center justify-center gap-1 rounded-lg rounded-bl-none px-4 py-1 ">
            <MessageCircleMoreIcon size={20} className="text-white" />
            <h1 className=" text-sm text-white">testimonials</h1>
          </div>
          <AnimatedTextFill align="center">What Clients Say</AnimatedTextFill>
        </div>
        <TestimonialsGrid testimonials={testimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
