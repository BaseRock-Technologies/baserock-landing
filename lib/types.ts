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

