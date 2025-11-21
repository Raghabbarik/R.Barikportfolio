import Link from "next/link";
import { contactDetails } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 lg:py-32 bg-card"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                Get in Touch
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Have a project in mind or just want to say hello? Feel free to
                reach out.
              </p>
            </div>
            <div className="space-y-4">
              {contactDetails.map((detail, index) => (
                <div key={index} className="flex items-center gap-4">
                  <detail.icon className="h-6 w-6 text-primary" />
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
              ))}
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
