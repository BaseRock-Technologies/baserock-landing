import { StaticImageData } from "next/image"

export interface Project {
  title: string
  description: string
  image: StaticImageData,
  technologies: {
    name: string,
    icon: StaticImageData,
  }[],
  link: string
}

export interface Testimonial {
  name: string
  image: string,
  quote: string
  role: string
  companyLogo?: string
}