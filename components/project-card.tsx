"use client";

import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  imageUrl: StaticImageData;
  title: string;
  description: string;
  technologies: { name: string; icon: StaticImageData }[];
  link: string;
}

export default function ProjectCard({
  imageUrl,
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  const router = useRouter();
  return (
    <Card className="relative flex h-full w-full overflow-hidden rounded-md py-0">
      <div className="group relative aspect-video h-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover opacity-80 transition-all duration-500 ease-in-out group-hover:scale-125 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
        />
      </div>

      <CardContent className="relative flex h-full flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <h3 className=" text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {description}
          </p>
        </div>
        <div className="flex gap-2">
          {technologies.map((tech) => (
            <Tooltip key={tech.name}>
              <TooltipTrigger>
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>{tech.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Button
          className="bg-primary hover:bg-primary relative mt-auto ml-auto w-fit cursor-pointer rounded-sm text-white"
          onClick={() => router.push(link)}
        >
          Know More
        </Button>
      </CardContent>
    </Card>
  );
}
