import { Project } from "@/types/types";
import { MoveUpRight } from "lucide-react";
import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !paragraphRef.current) return;

    const ctx = gsap.context(() => {
      // Split the text into words
      const splitText = new SplitText(paragraphRef.current, {
        type: "words,chars",
        charsClass: "char",
        wordsClass: "word",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Animate each character
      tl.fromTo(
        splitText.chars,
        {
          opacity: 0,
          y: 20,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.02,
          duration: 0.5,
        },
      );

      // Clean up SplitText on unmount
      return () => {
        splitText.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [sectionRef]);

  return (
    <section
      id="projectDetails"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-4"
    >
      <div className="breaker relative flex flex-col items-center justify-center gap-4">
        <h1 className="text-foreground font-anton text-5xl font-bold uppercase md:text-8xl lg:text-9xl">
          {project.title}
        </h1>
        <p
          ref={paragraphRef}
          className="text-foreground w-full max-w-full text-center text-lg font-bold md:max-w-2xl md:text-xl"
        >
          {project.description}
        </p>
        <Link
          href={project.link}
          target="_blank"
          className="border-primary bg-primary/40 hover:bg-primary/80 text-foreground font-anton flex items-center justify-center rounded-md border-2 px-4 py-2 tracking-tight transition-all duration-300"
        >
          View Project
          <MoveUpRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default ProjectDetails;
