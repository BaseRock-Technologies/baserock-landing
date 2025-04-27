import React from "react";
import { AnimatedText } from "../animations/animated-text";
import { Button } from "../ui/button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { HeroSliderImages } from "@/constantst";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
interface HeroProps {
  setIsContactOpen: (isOpen: boolean) => void;
}

const Hero = ({ setIsContactOpen }: HeroProps) => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [currentActiveBannerImage, setCurrentActiveBannerImage] =
    React.useState<StaticImageData>(HeroSliderImages[0].src);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setCurrentActiveBannerImage(
        HeroSliderImages[api.selectedScrollSnap()].src,
      );
    });

    // Initial state
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  return (
    <section className="bg-background text-foreground relative flex max-h-screen min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-40 sm:pt-24">
      <div className="absolute inset-0 h-full w-full">
        <div className="relative h-full w-full">
          <Image
            src={currentActiveBannerImage}
            alt="Banner"
            width={0}
            height={0}
            sizes="100vw"
            className="relative h-full w-full object-cover"
          />
          <div className="dark:bg-background/75 bg-background/30 absolute inset-0 backdrop-blur-sm"></div>
        </div>
      </div>
      <div className="custom-container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center">
        <AnimatedText className="mb-6 text-4xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl">
          From Code to Communication — We Build, Manage & Deliver
        </AnimatedText>
        <AnimatedText
          className="dark:text-muted-foreground text-background mx-auto mb-8 max-w-3xl text-sm sm:text-xl md:text-base"
          delay={0.3}
        >
          Custom tech solutions and content-driven services designed for impact.
          Whether you&apos;re building a brand, launching a product, or scaling
          your digital presence — we&apos;re here to help.
        </AnimatedText>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 cursor-pointer text-white"
            onClick={() => setIsContactOpen(true)}
          >
            Book a Discovery Call
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer"
            onClick={() => scrollToSection("services")}
          >
            Start Your Project Today
          </Button>
        </div>
      </div>

      {/* Image Containers */}
      <div className="relative bottom-2 z-20 mr-0 flex w-full items-center justify-end gap-2 max-sm:mt-6 sm:absolute sm:bottom-4 sm:mr-4">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "center",
            skipSnaps: false,
          }}
          className="relative flex h-36 w-full max-w-lg min-w-lg items-center justify-center"
          plugins={[plugin.current]}
        >
          <CarouselContent className="h-36 items-center">
            {HeroSliderImages.map((image, index) => (
              <CarouselItem
                key={index}
                className={`${current === index ? "h-28" : "h-24"} w-full basis-1/3`}
              >
                <Link href={image.link} className="relative h-full w-full">
                  <Card className="relative h-full w-full rounded-none border-0 p-0">
                    <CardContent className="relative flex h-full w-full items-center justify-center rounded-none p-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={`relative h-full w-full object-cover ${
                          current === index ? "brightness-100" : "brightness-50"
                        } transition-all duration-300`}
                      />
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
