"use client";

import { useParams } from "next/navigation";
import { projectSliderData } from "@/types/data";
import { useRouter } from "next/navigation";
import { Project } from "@/types/types";
import { useEffect, useState } from "react";
import { ContactModal } from "@/components/modals/contact-modal";
import ContactUs from "@/components/sections/contactus";
import Footer from "@/components/sections/footer";
import ProjectDetails from "@/components/sections/ProjectDetails";
import ProjectImageGrid from "@/components/sections/ProjectImageGrid";
import Loader from "@/components/sections/loader";
import { ProjectNavbar } from "@/components/project-navbar";
export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const router = useRouter();
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const project: Project | undefined = projectSliderData.find(
      (project) => project.id === projectId,
    );
    if (!project) {
      router.push("/");
      return;
    }
    setProject(project);
    setLoading(false);
  }, [projectId, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="from-background/50 to-primary/30 flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-t">
      {/* Grid of 4 images */}
      <ProjectNavbar
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        setContactOpen={setIsContactOpen}
      />

      <ProjectImageGrid project={project} />

      <ProjectDetails project={project} />
      {/* Contact Us Section */}
      <ContactUs setIsContactOpen={setIsContactOpen} />

      {/* Footer */}
      <Footer />

      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </div>
  );
}
