"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/types/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MenPlacholder from "@/public/assets/men-testimonial-placeholder.jpg";
import WomenPlacholder from "@/public/assets/women-testimonial-placeholder.jpg";

interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

interface ColumnItem {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  const [visibleCount, setVisibleCount] = useState(9);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const batchSize = 9;
  const [columnsCount, setColumnsCount] = useState(3);
  const animatedCardsRef = useRef<Set<string>>(new Set());
  const [showHideButton, setShowHideButton] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin();

      updateColumnsCount();

      window.addEventListener("resize", updateColumnsCount);
      return () => window.removeEventListener("resize", updateColumnsCount);
    }
  }, []);

  const getRandomPlaceholder = () => {
    return Math.random() < 0.5 ? MenPlacholder : WomenPlacholder;
  };

  const updateColumnsCount = () => {
    if (window.innerWidth < 640) {
      setColumnsCount(1);
    } else if (window.innerWidth < 768) {
      setColumnsCount(2);
    } else {
      setColumnsCount(3);
    }
  };

  const resetTestimonials = () => {
    setVisibleCount(9);
    setInitialLoad(true);
    setShowHideButton(false);
    setLoadingMore(false);
    animatedCardsRef.current.clear();
    setVisibleCount(9);
    containerRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cards = document.querySelectorAll(
        ".testimonial-card:not(.animated)",
      );

      cards.forEach((card) => {
        const cardId = card.getAttribute("data-index");

        if (cardId && animatedCardsRef.current.has(cardId)) {
          return;
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top bottom-=100px",
          onEnter: () => {
            if (cardId) {
              animatedCardsRef.current.add(cardId);
            }

            card.classList.add("animated");

            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 50,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => setLoadingMore(false),
              },
            );
          },
          once: true,
        });
      });
    }
  }, [visibleCount, columnsCount]);

  const loadMoreTestimonials = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setInitialLoad(false);

    setVisibleCount((prev) => {
      const newCount = Math.min(prev + batchSize, testimonials.length);
      if (newCount > batchSize * 2) setShowHideButton(true);
      return newCount;
    });
  }, [loadingMore, testimonials.length]);

  useEffect(() => {
    if (!initialLoad && visibleCount < testimonials.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && !loadingMore) {
            loadMoreTestimonials();
          }
        },
        { threshold: 0.1 },
      );

      // Observe the last testimonial card
      const lastCard = document.querySelector(".testimonial-card:last-child");
      if (lastCard) {
        observer.observe(lastCard);
      }

      return () => {
        if (lastCard) {
          observer.unobserve(lastCard);
        }
      };
    }
  }, [
    visibleCount,
    initialLoad,
    loadingMore,
    testimonials.length,
    loadMoreTestimonials,
  ]);

  // Organize testimonials into columns
  const organizeByColumns = (): ColumnItem[][] => {
    const initialTestimonials = testimonials.slice(0, 9);
    const additionalTestimonials = testimonials.slice(9, visibleCount);

    const columns: ColumnItem[][] = Array(columnsCount)
      .fill(null)
      .map(() => []);

    initialTestimonials.forEach((testimonial, index) => {
      const columnIndex = index % columnsCount;
      columns[columnIndex].push({ testimonial, index });
    });

    additionalTestimonials.forEach((testimonial, index) => {
      const columnIndex = index % columnsCount;
      columns[columnIndex].push({ testimonial, index: index + 9 });
    });
    return columns;
  };

  const columns = organizeByColumns();

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full space-y-8 overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col space-y-6">
            {column.map(({ testimonial, index }) => (
              <div
                key={index}
                data-index={index}
                className="testimonial-card w-full rounded-lg px-6 pt-6 pb-10 opacity-0"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full">
                      <Image
                        src={
                          testimonial.image
                            ? testimonial.image
                            : getRandomPlaceholder()
                        }
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="48px"
                      />
                    </div>

                    <div>
                      <div className="text-card-foreground line-clamp-1 font-semibold">
                        {testimonial.name}
                      </div>
                      <div className="text-muted-foreground line-clamp-1 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  {testimonial.companyLogo && (
                    <Image src={testimonial.companyLogo} alt="" sizes="24px" />
                  )}
                </div>
                <p className="text-muted-foreground">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {visibleCount < testimonials.length && initialLoad && (
        <div className="from-background via-background/40 absolute inset-x-0 bottom-0 flex h-full w-full items-end justify-center bg-gradient-to-t to-transparent">
          <div className="pb-8 text-center">
            <Button
              variant="outline"
              className="bg-primary hover:bg-primary/90 cursor-pointer text-white"
              onClick={loadMoreTestimonials}
            >
              Load More
            </Button>
          </div>
        </div>
      )}
      {loadingMore && (
        <div className="py-4 text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      )}
      {showHideButton && (
        <div className="align-center from-background via-background/80 absolute -bottom-16 mx-auto flex w-full justify-center bg-gradient-to-t to-transparent py-16">
          <Button
            variant="outline"
            className="bg-primary hover:bg-primary/90 cursor-pointer text-white"
            onClick={resetTestimonials}
          >
            Got it, Hide
          </Button>
        </div>
      )}
    </div>
  );
}
