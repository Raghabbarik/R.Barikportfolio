"use client";

import Link from "next/link";
import { useData } from "@/lib/data-context";
import { getIcon } from "@/lib/get-icon";

export default function Footer() {
  const { contactDetails } = useData();
  return (
    <footer className="w-full bg-card py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Raghab Barik. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {contactDetails
            .filter((detail) =>
              ["Instagram", "Linkedin"].includes(detail.iconName)
            )
            .map((detail) => {
              const Icon = getIcon(detail.iconName);
              return (
                <Link
                  key={detail.id}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  prefetch={false}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{detail.iconName}</span>
                </Link>
              )
            })}
        </div>
      </div>
    </footer>
  );
}
