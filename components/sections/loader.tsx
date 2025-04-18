"use client";

import { useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const landingRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const revealerLayerOneRef = useRef<SVGSVGElement>(null);
  const revealerLayerTwoRef = useRef<SVGSVGElement>(null);
  const revealerLayerThreeRef = useRef<SVGSVGElement>(null);

  // Set initial scale to 0 immediately to prevent flickering

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
                    // Show content after all revealers are done
                    onComplete();
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
    onComplete,
  ]);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      ref={landingRef}
    >
      <div className="relative flex h-full w-full items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            "loader-content",
            "flex gap-2 text-black dark:text-white",
          )}
          ref={loaderRef}
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
              className="fill-lime-400"
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
              className="fill-black dark:fill-white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
