import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useEffect } from "react";

interface ProjectNavbarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setContactOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function ProjectNavbar({
  isOpen,
  setIsOpen,
  setContactOpen,
}: ProjectNavbarProps) {
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
    <header className="fixed top-0 z-40 flex h-fit w-full items-center justify-center">
      <div className="breaker flex items-center justify-center">
        <div className="bg-background supports-[backdrop-filter]:bg-background/92 relative m-5 flex h-14 w-full items-center justify-between gap-6 rounded-xl border px-12 backdrop-blur">
          <Link className="font-bold" href="/">
            Baserock
          </Link>

          <Button
            variant={"link"}
            className="bg-primary hover:bg-primary/90 hidden text-white lg:block"
            onClick={() => {
              setIsOpen(false);
              setContactOpen(true);
            }}
          >
            Contact Us
          </Button>

          <Button
            variant={"link"}
            className="z-50 cursor-pointer p-2 focus:outline-none lg:hidden"
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
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-background/99 fixed top-0 left-0 min-h-screen w-full items-start justify-center shadow-md backdrop-blur-3xl lg:hidden">
          <div className="breaker relative flex min-h-screen flex-col space-y-10 py-10">
            <div className="relative flex w-full items-center justify-between">
              <Link href="/" className="font-bold">
                Baserock
              </Link>
              <X
                onClick={() => setIsOpen(false)}
                className="text-invert-background"
                size={24}
              />
            </div>

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
    </header>
  );
}
