"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/lib/types";

interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedTestimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card bg-card rounded-lg p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="text-card-foreground font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Senior Executive
                  </div>
                </div>
              </div>
              <svg
                viewBox="0 0 24 24"
                aria-label="X"
                className="text-muted-foreground h-5 w-5"
                role="img"
              >
                <path
                  fill="currentColor"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </div>
            <p className="text-muted-foreground">{testimonial.quote}</p>
          </div>
        ))}
      </div>
      {testimonials.length > 6 && !showAll && (
        <div className="text-center">
          <Button
            variant="outline"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setShowAll(true)}
          >
            Load More Testimonials
          </Button>
        </div>
      )}
    </div>
  );
}
