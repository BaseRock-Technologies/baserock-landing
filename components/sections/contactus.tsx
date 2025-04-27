import React from "react";
import ClickHere from "@/public/assets/click-here.png";
import Image from "next/image";
import { Pointer } from "lucide-react";
interface ContactUsProps {
  setIsContactOpen: (isContactOpen: boolean) => void;
}

const ContactUs = ({ setIsContactOpen }: ContactUsProps) => {
  return (
    <div className="relative h-full w-full">
      <div className="bg-primary absolute top-0 left-0 z-10 h-full w-full"></div>
      <div className="relative z-20 flex h-full w-full items-center justify-center">
        <h1 className="text-background z-20 text-center text-[15vw] font-bold uppercase">
          ContactUs
        </h1>
        <h1 className="text-helper absolute z-10 text-center text-[15.25vw] font-bold uppercase">
          ContactUs
        </h1>
      </div>
      <div
        onClick={() => setIsContactOpen(true)}
        className=" absolute -top-1/5 left-3/4 z-20 flex w-fit -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-2 uppercase sm:top-0 "
      >
        <div className="bg-helper relative h-full w-full rounded-full p-2">
          <div className="relative h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16">
            <Image src={ClickHere} alt="Click Here" />
            <Pointer className="text-background absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 lg:size-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
