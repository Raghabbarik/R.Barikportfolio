
"use client";

import Link from "next/link";
import { useData } from "@/lib/data-context";
import { getIcon } from "@/lib/get-icon";
import { ContactForm } from "@/components/contact-form";
import { Skeleton } from "../ui/skeleton";
import TextType from "../ui/text-type";

export default function ContactSection() {
  const { contactDetails, isDataLoaded } = useData();

  if (!isDataLoaded) {
     return (
      <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
           <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-6 w-full" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-8 w-2/3" />
                </div>
              </div>
              <div>
                <Skeleton className="h-96 w-full" />
              </div>
           </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 lg:py-32 bg-card"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="space-y-2">
               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl min-h-[48px] md:min-h-[60px]">
                 <TextType
                    text="Get in Touch"
                    typingSpeed={50}
                    deletingSpeed={25}
                    pauseDuration={4000}
                    loop={false}
                    startOnVisible={true}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                    cursorClassName="text-primary"
                />
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Have a project in mind or just want to say hello? Feel free to
                reach out.
              </p>
            </div>
            <div className="space-y-4">
              {contactDetails.map((detail) => {
                const Icon = getIcon(detail.iconName);
                return (
                  <div key={detail.id} className="flex items-center gap-4">
                    <Icon className="h-6 w-6 text-primary" />
                    <Link
                      href={detail.href}
                      target={
                        detail.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel="noopener noreferrer"
                      className="text-lg text-muted-foreground transition-colors hover:text-primary"
                    >
                      {detail.text}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="space-y-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
