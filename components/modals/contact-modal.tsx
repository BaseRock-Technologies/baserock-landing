import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof formSchema>;

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  });

  const [visibleErrors, setVisibleErrors] = useState(errors);

  useEffect(() => {
    setVisibleErrors(errors);
    const timer = setTimeout(() => setVisibleErrors({}), 5000);
    return () => clearTimeout(timer);
  }, [errors]);

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/50 backdrop-blur-sm dark:bg-black/50">
      <div className="bg-theme-card relative w-full max-w-lg rounded-lg p-6 shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          onClick={onClose}
        >
          <X size={20} className="text-foreground cursor-pointer" />
        </button>
        <h2 className="mb-3 text-2xl font-bold">Get in Touch</h2>
        <p className="text-muted-foreground mb-4 text-base">
          Ready to transform your business? Contact us today for a free
          consultation.
        </p>
        <div className="mb-4 flex items-center gap-2 text-sm">
          <Mail className="text-primary h-5 w-5" />
          <span>contact@techconsulting.com</span>
        </div>
        <Card className="border-none bg-transparent">
          <CardContent className="px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name<sup className="text-red-500">*</sup>
                  </label>
                  <Input className="mt-2" id="name" {...register("name")} />
                  {visibleErrors.name && (
                    <p className="text-xs text-red-500">
                      {visibleErrors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email<sup className="text-red-500">*</sup>
                  </label>
                  <Input
                    className="mt-2"
                    id="email"
                    type="email"
                    {...register("email")}
                  />
                  {visibleErrors.email && (
                    <p className="text-xs text-red-500">
                      {visibleErrors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject<sup className="text-red-500">*</sup>
                </label>
                <Input className="mt-2" id="subject" {...register("subject")} />
                {visibleErrors.subject && (
                  <p className="text-xs text-red-500">
                    {visibleErrors.subject.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message<sup className="text-red-500">*</sup>
                </label>
                <Textarea
                  id="message"
                  {...register("message")}
                  className="mt-2 max-h-28 min-h-28"
                />
                {visibleErrors.message && (
                  <p className="text-xs text-red-500">
                    {visibleErrors.message.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-primary w-full cursor-pointer text-white"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
