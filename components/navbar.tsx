"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-center border-b backdrop-blur">
      <div className="custom-container relative flex h-14 w-full items-center justify-between">
        <Link href="/" className="font-bold">
          TechConsulting
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#testimonials">Testimonials</Link>
        </nav>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="#contact">Contact Us</Link>
        </Button>
      </div>
    </header>
  );
}
