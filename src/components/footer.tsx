import Link from "next/link";
import { contactDetails } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="w-full bg-card py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Raghab Barik. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {contactDetails
            .filter((detail) =>
              ["Instagram", "Linkedin"].includes(detail.icon.displayName || "")
            )
            .map((detail) => (
              <Link
                key={detail.href}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                prefetch={false}
              >
                <detail.icon className="h-5 w-5" />
                <span className="sr-only">{detail.icon.displayName}</span>
              </Link>
            ))}
        </div>
      </div>
    </footer>
  );
}
