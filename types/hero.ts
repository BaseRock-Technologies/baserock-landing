import { StaticImageData } from "next/image";

export interface HeroImage {
  id: string;
  src: StaticImageData;
  alt: string;
  link: string;
}