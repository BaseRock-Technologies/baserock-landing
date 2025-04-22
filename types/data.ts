import {
  Code2,
  Layout,
  BarChart3,
  PenTool,
  Mic2,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react"

export const services = [
  {
    icon: Code2,
    title: "Web & App Development",
    description: "Crafting custom websites and mobile applications focused on performance, scalability, and user experience.",
  },
  {
    icon: Layout,
    title: "Product Development",
    description: "Building digital products from MVPs to full-scale platforms with a problem-solving approach.",
  },
  {
    icon: BarChart3,
    title: "Project Management",
    description: "Coordinating and executing projects seamlessly using agile methodologies and collaborative tools.",
  },
  {
    icon: Layout,
    title: "Product Management",
    description: "Developing strategy-led product visions, roadmaps, and feature optimizations with a user-centric focus.",
  },
  {
    icon: PenTool,
    title: "Content & SEO Writing",
    description: "Creating compelling content optimized for search engines to enhance your online presence.",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Management & Personal Branding",
    description: "Elevating your professional profile and personal brand on LinkedIn to connect with your target audience effectively.",
  },
  {
    icon: Layout,
    title: "Design (UI/UX, Graphics)",
    description: "Designing intuitive user interfaces and engaging graphics to enhance user experience and brand identity.",
  },
  {
    icon: Mic2,
    title: "Voiceovers & Event Hosting",
    description: "Providing professional voiceover services and event hosting to captivate and engage your audience.",
  },
]

// images
import NextJs from "@/public/assets/icons/nextjs.svg"
import Tailwindcss from "@/public/assets/icons/tailwind-css.svg"
import Wordpress from "@/public/assets/icons/wordpress.svg"
import Placeholder from "@/public/assets/projects-placeholder.jpg";
import { Project } from "./types"

// Sample data for the images
export const projectSliderData: Project[] = [
  {
    images: [
      { id: 1, image: Placeholder },
      { id: 2, image: Placeholder },
      { id: 3, image: Placeholder },
      { id: 4, image: Placeholder },
    ],
    title: "Project One",
    technologies: [
      { name: "Next.js", icon: NextJs },
      { name: "Tailwind", icon: Tailwindcss },
      { name: "WordPress", icon: Wordpress },
    ],
    link: "/",
  },
  {
    images: [
      { id: 1, image: Placeholder },
      { id: 2, image: Placeholder },
      { id: 3, image: Placeholder },
      { id: 4, image: Placeholder },
    ],
    title: "Project Two",
    technologies: [
      { name: "Next.js", icon: NextJs },
      { name: "Tailwind", icon: Tailwindcss },
      { name: "WordPress", icon: Wordpress },
    ],
    link: "/",
  },
  {
    images: [
      { id: 1, image: Placeholder },
      { id: 2, image: Placeholder },
      { id: 3, image: Placeholder },
      { id: 4, image: Placeholder },
    ],
    title: "Project Three",
    technologies: [
      { name: "Next.js", icon: NextJs },
      { name: "Tailwind", icon: Tailwindcss },
      { name: "WordPress", icon: Wordpress },
    ],
    link: "/",
  },
  {
    images: [
      { id: 1, image: Placeholder },
      { id: 2, image: Placeholder },
      { id: 3, image: Placeholder },
      { id: 4, image: Placeholder },
    ],
    title: "Project Four",
    technologies: [
      { name: "Next.js", icon: NextJs },
      { name: "Tailwind", icon: Tailwindcss },
      { name: "WordPress", icon: Wordpress },
    ],
    link: "/",
  },
  {
    images: [
      { id: 1, image: Placeholder },
      { id: 2, image: Placeholder },
      { id: 3, image: Placeholder },
      { id: 4, image: Placeholder },
    ],
    title: "Project Five",
    technologies: [
      { name: "Next.js", icon: NextJs },
      { name: "Tailwind", icon: Tailwindcss },
      { name: "WordPress", icon: Wordpress },
    ],
    link: "/",
  },
  {
    images: [
      { id: 1, image: Placeholder },
      { id: 2, image: Placeholder },
      { id: 3, image: Placeholder },
      { id: 4, image: Placeholder },
    ],
    title: "Project Six",
    technologies: [
      { name: "Next.js", icon: NextJs },
      { name: "Tailwind", icon: Tailwindcss },
      { name: "WordPress", icon: Wordpress },
    ],
    link: "/",
  },
  {
    images: [
      { id: 1, image: Placeholder },
      { id: 2, image: Placeholder },
      { id: 3, image: Placeholder },
      { id: 4, image: Placeholder },
    ],
    title: "Project Seven",
    technologies: [
      { name: "Next.js", icon: NextJs },
      { name: "Tailwind", icon: Tailwindcss },
      { name: "WordPress", icon: Wordpress },
    ],
    link: "/",
  },
];

export const testimonials = [
  {
    name: "Client",
    image: "",
    quote: "Sahithya delivers with clarity and care. Every request is handled with attention to detail and exceptional responsiveness.",
    role: "Web Development Client"
  },
  {
    name: "Client",
    image: "",
    quote: "Her ability to understand content and tech both is rare. Our project moved faster and better because of her.",
    role: "SEO & Writing Client"
  },
  {
    name: "Founder",
    image: "",
    quote: "From branding to execution, BaseRock brought my startup idea to life.",
    role: "Product Client"
  }
]

export const socialLinks = [
  {
    href: "https://linkedin.com/company/baserock-technologies",
    icon: Linkedin,
    label: "LinkedIn"
  },
  {
    href: "https://instagram.com/baserocktechnologies",
    icon: Instagram,
    label: "Instagram"
  },
  {
    href: "https://twitter.com/baserocktech",
    icon: Twitter,
    label: "Twitter"
  }
]

