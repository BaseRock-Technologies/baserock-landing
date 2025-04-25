import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  position: number;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  position,
  className,
}: ServiceCardProps) {
  const getRandomPosition = (position: number) => {
    const choices = [
      "right-10",
      "left-1/4",
      "right-1/2 left-1/2",
      "right-1/4",
      "right-3/4",
      "left-16",
      "right-4/5",
      "left-2/3",
      "right-2/3",
    ];
    return choices[position] ?? choices[0];
  };
  const getBackground = (position: number) => {
    const choices = [
      "bg-violet-800",
      "bg-violet-700",
      "bg-violet-600",
      "bg-violet-500",
      "bg-violet-400",
      "bg-violet-800",
      "bg-violet-700",
      "bg-violet-600",
      "bg-violet-500",
      "bg-violet-400",
    ];
    return choices[position] ?? choices[0];
  };
  const getTitleSize = (title: string) => {
    if (title.length > 30) {
      return "text-[3.5vw]";
    }
    if (title.length > 25) {
      return "text-[4.5vw]";
    }
    if (title.length > 15) {
      return "text-[5vw]";
    }
    return "text-[4vw]";
  };

  const handleMouseEnter = () => {
    const cards = document.querySelectorAll(".service-card");
    for (let i = 0; i <= position; i++) {
      const card = cards[i] as HTMLDivElement;
      if (card) {
        card.classList.add("animate-service-card");
      }
    }
  };

  const handleMouseLeave = () => {
    const cards = document.querySelectorAll(".service-card");
    for (let i = 0; i <= position; i++) {
      const card = cards[i] as HTMLDivElement;
      if (card) {
        card.classList.remove("animate-service-card");
      }
    }
  };

  const formatPosition = (position: number) => {
    if (position + 1 < 10) {
      return `0${position + 1}.`;
    }
    return `${position + 1}.`;
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "service-card relative flex w-full flex-col items-center justify-center transition-transform duration-300 will-change-transform",
        className,
        position > 0 && "-mt-[20vw]",
      )}
      data-position={position}
    >
      <div className="relative z-20 flex size-10 h-[30.9722vw] w-full items-start justify-center p-4 perspective-distant">
        <div
          className={cn(
            getBackground(position),
            "absolute top-0 right-0 bottom-0 left-0 w-full -translate-z-[1.38889vw] -rotate-x-6",
          )}
        ></div>
        <div
          className={cn(
            getRandomPosition(position),
            "absolute z-20 text-xl font-semibold",
          )}
        >
          {formatPosition(position)}
        </div>
        <div className="relative mt-4 flex h-full w-full flex-col items-center justify-start">
          <h1
            className={cn(
              "title font-semibold text-violet-100/70",
              getTitleSize(title),
            )}
          >
            {title}
          </h1>
          <p className="absolute right-16 bottom-16 max-w-xs text-lg text-white">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
