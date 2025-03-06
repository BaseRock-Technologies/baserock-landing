import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  className,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "service-card bg-theme-card relative cursor-pointer overflow-hidden rounded-lg p-4 pt-14 pb-8 transition-shadow duration-250",
        className,
      )}
    >
      <span className="relative z-20 flex size-10 items-center justify-center">
        <div className="bg-secondary border-border absolute size-10 rounded-full border"></div>
        <Icon className="text-primary relative z-10 block transform-gpu transition-colors duration-250" />
      </span>
      <h4 className="relative z-20 mt-3 mb-1 text-xl leading-8 font-semibold">
        {title}
      </h4>
      <p className="relative z-20 m-0 text-sm leading-6">{description}</p>
      <div className="shine rounded-inherit absolute inset-0 z-10 overflow-hidden opacity-0 transition-opacity duration-500"></div>
      <div className="background rounded-inherit absolute inset-0 overflow-hidden">
        <div className="tiles opacity-0 transition-opacity duration-250">
          <div className="tile tile-1"></div>
          <div className="tile tile-2"></div>
          <div className="tile tile-3"></div>
          <div className="tile tile-4"></div>
          <div className="tile tile-5"></div>
          <div className="tile tile-6"></div>
          <div className="tile tile-7"></div>
          <div className="tile tile-8"></div>
          <div className="tile tile-9"></div>
          <div className="tile tile-10"></div>
        </div>

        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
    </div>
  );
}
