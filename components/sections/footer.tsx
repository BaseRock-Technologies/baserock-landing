import { socialLinks } from "@/types/data";
import { CopyrightIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-theme-card relative w-full text-white transition-colors duration-200">
      <div className="custom-container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-center gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="hover:text-primary transition-colors"
              aria-label={social.label}
            >
              <social.icon className="text-primary h-6 w-6 dark:text-white" />
            </a>
          ))}
        </div>
        <div className="group relative flex flex-col items-center justify-center gap-1 text-center text-sm text-gray-400 sm:flex-row">
          <div className="flex items-center justify-center gap-1">
            <CopyrightIcon
              className="group-hover:text-primary text-primary dark:text-white"
              size={20}
            />{" "}
            {new Date().getFullYear()}
            <h1>BaseRock Technologies</h1>
          </div>
          <h1>All rights reserved.</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
