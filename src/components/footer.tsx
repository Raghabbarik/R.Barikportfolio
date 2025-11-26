
"use client";

import Link from "next/link";
import { useData } from "@/lib/data-context";
import { getIcon } from "@/lib/get-icon";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { useVisitorCount } from "@/hooks/use-visitor-count";
import { Eye } from "lucide-react";

function VisitorCounter() {
    const visitorCount = useVisitorCount();
    
    if (visitorCount === null) {
        return <Skeleton className="h-5 w-24" />;
    }

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{visitorCount.toLocaleString()} Visitors</span>
        </div>
    );
}

export default function Footer() {
  const { contactDetails, isDataLoaded } = useData();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !isDataLoaded) {
    return (
      <footer className="w-full bg-card py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
           <Skeleton className="h-5 w-1/3" />
           <Skeleton className="h-5 w-1/4" />
        </div>
      </footer>
    )
  }

  return (
    <footer className="w-full bg-card py-6">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Raghab Barik. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
            {contactDetails
                .filter((detail) =>
                ["Instagram", "Linkedin", "Github"].includes(detail.iconName)
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
        <div className="absolute bottom-0 right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-auto md:left-1/2 md:-translate-x-1/2">
            <VisitorCounter />
        </div>
      </div>
    </footer>
  );
}
