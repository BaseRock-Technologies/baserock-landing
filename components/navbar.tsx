import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useEffect } from "react";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setContactOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function Navbar({ isOpen, setIsOpen, setContactOpen }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-center border-b backdrop-blur">
      <div className="custom-container relative flex h-14 w-full items-center justify-between gap-6">
        <Link className="font-bold" href="/">
          TechConsulting
        </Link>

        <nav className="hidden items-center  text-sm font-medium md:flex">
          <Button variant={"link"} onClick={() => scrollToSection("about")}>
            About
          </Button>
          <Button variant={"link"} onClick={() => scrollToSection("services")}>
            Services
          </Button>
          <Button variant={"link"} onClick={() => scrollToSection("projects")}>
            Projects
          </Button>
          <Button
            variant={"link"}
            onClick={() => scrollToSection("testimonials")}
          >
            Testimonials
          </Button>
        </nav>

        <Button
          variant={"link"}
          className="bg-primary hover:bg-primary/90 hidden text-white md:block"
          onClick={() => {
            setIsOpen(false);
            setContactOpen(true);
          }}
        >
          Contact Us
        </Button>

        <Button
          variant={"link"}
          className="z-50 cursor-pointer p-2 focus:outline-none md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X
              className="hover:text-primary text-black dark:text-white"
              size={24}
            />
          ) : (
            <Menu
              className="hover:text-primary text-black dark:text-white"
              size={24}
            />
          )}
        </Button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="bg-background/99 fixed top-0 left-0 flex min-h-screen w-full items-start justify-center shadow-md backdrop-blur-3xl md:hidden">
            <div className="custom-container relative flex min-h-screen flex-col space-y-10 py-4">
              <Link href="/" className="font-bold">
                TechConsulting
              </Link>
              <nav className="flex flex-col items-start space-y-4 py-4 text-sm font-medium">
                <Button
                  variant={"link"}
                  className="hover:text-primary text-2xl text-black dark:text-white"
                  onClick={() => scrollToSection("about")}
                >
                  About
                </Button>
                <Button
                  variant={"link"}
                  className="hover:text-primary text-2xl text-black dark:text-white"
                  onClick={() => scrollToSection("services")}
                >
                  Services
                </Button>
                <Button
                  variant={"link"}
                  className="hover:text-primary text-2xl text-black dark:text-white"
                  onClick={() => scrollToSection("projects")}
                >
                  Projects
                </Button>
                <Button
                  variant={"link"}
                  className="hover:text-primary text-2xl text-black dark:text-white"
                  onClick={() => scrollToSection("testimonials")}
                >
                  Testimonials
                </Button>
              </nav>
              <Button
                variant={"link"}
                className="bg-primary hover:bg-primary/90 mx-auto mt-auto mb-20 w-fit px-10"
                onClick={() => {
                  setIsOpen(false);
                  setContactOpen(true);
                }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
