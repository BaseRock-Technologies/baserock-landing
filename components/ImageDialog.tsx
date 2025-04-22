import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

// Image object type
export interface ImageObject {
  id: number;
  image: StaticImageData | string;
}

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  images?: ImageObject[];
  technologies?: { name: string; icon: StaticImageData }[];
}

export default function ImageDialog({
  open,
  onOpenChange,
  title = "",
  images = [],
  technologies = [],
}: ImageDialogProps) {
  const [currentImage, setCurrentImage] = useState<ImageObject | undefined>(
    images[0],
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topOverlayRef = useRef<HTMLDivElement>(null);
  const bottomOverlayRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Set current image when mainImage changes
  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  // Handle dialog open/close with overlay animation
  useGSAP(() => {
    if (
      open &&
      dialogRef.current &&
      contentRef.current &&
      topOverlayRef.current &&
      bottomOverlayRef.current &&
      imageContainerRef.current
    ) {
      // Set initial state
      gsap.set(dialogRef.current, {
        opacity: 1,
        visibility: "visible",
      });

      // Ensure overlays are reset to initial state
      gsap.set(topOverlayRef.current, {
        height: "40%",
      });

      gsap.set(bottomOverlayRef.current, {
        height: "40%",
      });

      // Create animation sequence with delay
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Add delay before starting overlay animation
      tl.to({}, { duration: 0.4 }); // Empty tween for delay

      // Animate overlays to shrink vertically
      tl.to(topOverlayRef.current, {
        height: "0%",
        duration: 0.8,
        ease: "power2.inOut",
      });

      tl.to(
        bottomOverlayRef.current,
        {
          height: "0%",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.8",
      ); // Make them shrink simultaneously
    } else if (!open && dialogRef.current) {
      // Kill any running animations
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Simple fade out for closing
      gsap.to(dialogRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(dialogRef.current, { visibility: "hidden" });

          // Reset overlays to initial state for next opening
          if (topOverlayRef.current && bottomOverlayRef.current) {
            gsap.set(topOverlayRef.current, {
              height: "40%",
            });

            gsap.set(bottomOverlayRef.current, {
              height: "40%",
            });
          }
        },
      });
    }
  }, [open]);

  // Clean up animations when component unmounts
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Handle image change - directly set current image without animation
  const handleImageChange = (image: ImageObject) => {
    if (image.id === currentImage?.id) return;
    setCurrentImage(image);
  };

  // Handle close
  const handleClose = () => {
    onOpenChange(false);
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Filter out the current image from the thumbnail list
  const thumbnailImages =
    currentImage && images.length > 0
      ? images.filter((img) => img.id !== currentImage.id)
      : [];

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ visibility: "hidden" }}
    >
      <div
        ref={contentRef}
        className="relative mx-auto h-[85vh] w-full max-w-6xl overflow-hidden rounded-md bg-black"
      >
        {/* Top Overlay */}
        <div
          ref={topOverlayRef}
          className="bg-primary/60 pointer-events-none absolute right-0 left-0 z-20 backdrop-blur-2xl"
          style={{ height: "40%", top: "0" }}
        ></div>

        {/* Bottom Overlay */}
        <div
          ref={bottomOverlayRef}
          className="bg-primary/60 pointer-events-none absolute right-0 left-0 z-20 backdrop-blur-2xl"
          style={{ height: "40%", bottom: "0" }}
        ></div>

        {/* Main Image */}
        <div ref={imageContainerRef} className="h-full w-full">
          {currentImage && (
            <Image
              src={currentImage.image}
              alt={`${title || "Project image"} - ${currentImage.id}`}
              className="h-full w-full object-cover"
              fill
              sizes="100vw"
              priority
            />
          )}

          {/* Close button */}
          <button
            onClick={handleClose}
            className="bg-primary/90 hover:bg-primary/100 absolute top-6 right-6 z-30 cursor-pointer rounded-md p-2 text-white"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Bottom overlay for text and thumbnails */}
        <div className="absolute right-0 bottom-0 left-0 z-10 flex flex-row bg-gradient-to-t from-black/90 to-transparent p-6">
          {/* Content (Bottom Right) */}
          <div className="flex-1 text-white">
            <div className="text-content">
              <h2 className="mb-1 text-2xl font-bold">{title}</h2>
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
          </div>

          {/* Thumbnail Images (Bottom Left) */}
          <div className="relative ml-6 flex flex-1 items-end justify-center">
            {thumbnailImages.length > 0 && (
              <div className="relative flex w-full gap-3">
                {thumbnailImages.slice(0, 5).map((img) => {
                  const isActive = currentImage?.id === img.id;
                  return (
                    <div
                      key={img.id}
                      className={`thumbnail-image relative h-20 w-full cursor-pointer overflow-hidden rounded-md transition-all
                        ${
                          isActive
                            ? "ring-primary/30 outline-primary ring-2 outline-2"
                            : "hover:outline-primary/70 outline-2 outline-transparent"
                        }`}
                      onClick={() => handleImageChange(img)}
                    >
                      <Image
                        src={img.image}
                        alt={`Thumbnail ${img.id}`}
                        className="h-full w-full object-cover"
                        fill
                        sizes="100px"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  );
                })}
                {thumbnailImages.length > 5 && (
                  <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white/10 text-white">
                    +{thumbnailImages.length - 5}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
