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
import Wordpress from "@/public/assets/icons/wordpress.svg"
import { Project } from "./types"

//shruthidhavala
import ShrutidhavalaMainImage from "@/public/assets/projects/shruthidhavala/main.png";
import ShrutidhavalaSupportOneImage from "@/public/assets/projects/shruthidhavala/support-one.png";
import ShrutidhavalaSupportTwoImage from "@/public/assets/projects/shruthidhavala/support-two.png";
import ShrutidhavalaSupportThreeImage from "@/public/assets/projects/shruthidhavala/support-three.png";

// adszoo
import AdszMainImage from "@/public/assets/projects/adszoo/main.png";
import AdszSupportOneImage from "@/public/assets/projects/adszoo/support-one.png";
import AdszSupportTwoImage from "@/public/assets/projects/adszoo/support-two.png";
import AdszSupportThreeImage from "@/public/assets/projects/adszoo/support-three.png";

// filmytics
import FilmyticsMainImage from "@/public/assets/projects/filmytics/main.png";
import FilmyticsSupportOneImage from "@/public/assets/projects/filmytics/support-one.png";
import FilmyticsSupportTwoImage from "@/public/assets/projects/filmytics/support-two.png";
import FilmyticsSupportThreeImage from "@/public/assets/projects/filmytics/support-three.png";

// oneustravels
import OneustraveMainImage from "@/public/assets/projects/oneustravels/main.png";
import OneustraveSupportOneImage from "@/public/assets/projects/oneustravels/support-one.png";
import OneustraveSupportTwoImage from "@/public/assets/projects/oneustravels/support-two.png";
import OneustraveSupportThreeImage from "@/public/assets/projects/oneustravels/support-three.png";

// ghostly
import GhostlyMainImage from "@/public/assets/projects/ghostly/main.png";
import GhostlySupportOneImage from "@/public/assets/projects/ghostly/support-one.png";
import GhostlySupportTwoImage from "@/public/assets/projects/ghostly/support-two.png";
import GhostlySupportThreeImage from "@/public/assets/projects/ghostly/support-three.png";

// mezora
import MezoraMainImage from "@/public/assets/projects/mezora/main.png";
import MezoraSupportOneImage from "@/public/assets/projects/mezora/support-one.png";
import MezoraSupportTwoImage from "@/public/assets/projects/mezora/support-two.png";
import MezoraSupportThreeImage from "@/public/assets/projects/mezora/support-three.png";

// adtoleadz
import AdtoleadzMainImage from "@/public/assets/projects/adtoleadz/main.png";
import AdtoleadzSupportOneImage from "@/public/assets/projects/adtoleadz/support-one.png";
import AdtoleadzSupportTwoImage from "@/public/assets/projects/adtoleadz/support-two.png";
import AdtoleadzSupportThreeImage from "@/public/assets/projects/adtoleadz/support-three.png";

// sahithya-portfolio
import SahithyaPortfolioMainImage from "@/public/assets/projects/sahithya-portfolio/main.png";
import SahithyaPortfolioSupportOneImage from "@/public/assets/projects/sahithya-portfolio/support-one.png";
import SahithyaPortfolioSupportTwoImage from "@/public/assets/projects/sahithya-portfolio/support-two.png";
import SahithyaPortfolioSupportThreeImage from "@/public/assets/projects/sahithya-portfolio/support-three.png";



// Sample data for the images
export const projectSliderData: Project[] = [
  {
    id: "shrutidhavala",
    images: [
      { id: 1, image: ShrutidhavalaMainImage },
      { id: 2, image: ShrutidhavalaSupportOneImage },
      { id: 3, image: ShrutidhavalaSupportTwoImage },
      { id: 4, image: ShrutidhavalaSupportThreeImage },
    ],
    title: "Shrutidhavala",
    description: "A modern portfolio website for Shruthi Dhavala, showcasing her creative work and achievements.",
    technologies: [
      { name: "WordPress", icon: Wordpress },
    ],
    link: "https://shrutidhavala.com",
  },
  {
    id: "adszoo",
    images: [
      { id: 1, image: AdszMainImage },
      { id: 2, image: AdszSupportOneImage },
      { id: 3, image: AdszSupportTwoImage },
      { id: 4, image: AdszSupportThreeImage },
    ],
    title: "Adszoo",
    description: "Optimized all website content for Adszoo, ensuring clear messaging and strong SEO performance. Crafted engaging copy to boost search visibility and connect with the target audience.",
    technologies: [],
    link: "https://adszoo.com",
  },
  {
    id: "filmytics",
    images: [
      { id: 1, image: FilmyticsMainImage },
      { id: 2, image: FilmyticsSupportOneImage },
      { id: 3, image: FilmyticsSupportTwoImage },
      { id: 4, image: FilmyticsSupportThreeImage },
    ],
    title: "Filmytics",
    description: "Developed and optimized all website content for Filmytics, ensuring clear messaging and strong SEO performance.",  
    technologies: [
      { name: "WordPress", icon: Wordpress },
    ],
    link: "https://filmytics.com",
  },
  {
    id: "oneustravels",
    images: [
      { id: 1, image: OneustraveMainImage },
      { id: 2, image: OneustraveSupportOneImage },
      { id: 3, image: OneustraveSupportTwoImage },
      { id: 4, image: OneustraveSupportThreeImage },
    ],
    title: "Oneustravels",
    description: "Developed and optimized all website content for Oneustravels, ensuring clear messaging and strong SEO performance.",
    technologies: [],
    link: "https://www.oneustravels.com",
  },
  {
    id: "ghostly",
    images: [
      { id: 1, image: GhostlyMainImage },
      { id: 2, image: GhostlySupportOneImage },
      { id: 3, image: GhostlySupportTwoImage },
      { id: 4, image: GhostlySupportThreeImage },
    ],
    title: "Ghostly",
    description: "A modern and user-friendly platform to showcase its unique offerings. Built with a focus on performance, scalability, and an engaging user experience.",
    technologies: [],
    link: "https://ghostly.baserock.in",
  },
  {
    id: "mezora",
    images: [
      { id: 1, image: MezoraMainImage },
      { id: 2, image: MezoraSupportOneImage },
      { id: 3, image: MezoraSupportTwoImage },
      { id: 4, image: MezoraSupportThreeImage },
    ],
    title: "Mezora",
    description: "Provided ongoing support and maintenance for the Mezora website to ensure optimal performance and reliability.",
    technologies: [
    ],
    link: "https://mezora.in",
  },
  {
    id: "adtoleadz",
    images: [
      { id: 1, image: AdtoleadzMainImage },
      { id: 2, image: AdtoleadzSupportOneImage },
      { id: 3, image: AdtoleadzSupportTwoImage },
      { id: 4, image: AdtoleadzSupportThreeImage },
    ],
    title: "Adtoleadz",
    description: "Provided ongoing support and hosting services for the Adtoleadz website to ensure optimal performance and reliability. ",
    technologies: [],
    link: "https://adtoleadz.com",
  },
  {
    id: "sahithya-portfolio",
    images: [
      { id: 1, image: SahithyaPortfolioMainImage },
      { id: 2, image: SahithyaPortfolioSupportOneImage },
      { id: 3, image: SahithyaPortfolioSupportTwoImage },
      { id: 4, image: SahithyaPortfolioSupportThreeImage },
    ],
    title: "Portfolio",
    description: "Designed the Sahithya Portfolio website in Figma, creating a modern and visually engaging user interface. Crafted a seamless experience to showcase creative work and achievements effectively.",
    technologies: [],
    link: "https://www.figma.com/proto/jIsvFprotyWo2vaYWQljFN/Work---My-Design?node-id=1121-875&node-type=frame&t=6oWKxok3tEn2nl27-1&scaling=min-zoom&content-scaling=fixed&page-id=1121%3A874",
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

