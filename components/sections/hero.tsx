import GirHoldingMic from "@/public/assets/girl-holding-mic.png";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-background text-foreground relative flex max-h-screen min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-40">
      <div className="custom-container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-anton relative mb-6 w-full text-6xl font-bold text-white  uppercase md:text-8xl lg:w-4/5 lg:text-9xl">
          From Code to Communication, We Build&nbsp;
          <div className="bg-primary relative mt-1 inline-block aspect-video h-[3.75rem] w-[8.25rem] overflow-hidden rounded-md md:h-[6rem] md:w-[14rem] lg:h-[8rem]">
            <Image
              src={GirHoldingMic}
              alt="Girl Holding Mic"
              width={0}
              height={0}
              sizes="100vw"
              priority
              loading="eager"
              className="absolute h-full w-full object-cover object-top "
            />
          </div>
          &nbsp;Manage & Deliver
        </h1>
      </div>
    </section>
  );
};

export default Hero;
