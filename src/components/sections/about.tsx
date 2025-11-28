
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useData } from "@/lib/data-context";
import { Briefcase, GraduationCap, Download } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import Link from "next/link";
import TextType from "../ui/text-type";

function isValidHttpUrl(string: string | undefined) {
    if (!string || string.length === 0) return false;
    if (string.startsWith('data:image/') || string.startsWith('http')) {
        return true;
    }
    return false;
}

function AboutSectionContent() {
  const { about } = useData();
  const hasValidImage = isValidHttpUrl(about.aboutImageUrl);

  return (
    <div className="container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
      <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
        {hasValidImage ? (
          <Image
            src={about.aboutImageUrl}
            alt="About me image"
            data-ai-hint={about.aboutImageHint}
            fill
            className="rounded-lg object-cover shadow-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg border-dashed border-2">
            <p className="text-muted-foreground text-center">Invalid or<br />No Image URL</p>
          </div>
        )}
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{about.tagline}</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl min-h-[48px] md:min-h-[60px]">
             <TextType
                text={about.title}
                typingSpeed={50}
                deletingSpeed={25}
                pauseDuration={4000}
                loop={false}
                startOnVisible={true}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                cursorClassName="text-primary"
              />
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed">
            {about.description}
          </p>
        </div>
        <div className="flex gap-4">
          {about.resumeUrl ? (
            <Button asChild>
                <Link href={about.resumeUrl} target="_blank" rel="noopener noreferrer" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                </Link>
            </Button>
          ) : (
             <Button disabled>
                <Download className="mr-2 h-4 w-4" />
                Resume Not Available
             </Button>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="transition-all duration-300 hover:bg-muted/50 hover:shadow-lg hover:-translate-y-2 hover:shadow-primary/20">
            <CardHeader className="flex flex-row items-center gap-4">
              <GraduationCap className="w-8 h-8 text-primary" />
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="font-semibold">
                {about.education.degree}
              </p>
              <p className="text-sm text-muted-foreground">
                {about.education.institution}
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:bg-muted/50 hover:shadow-lg hover:-translate-y-2 hover:shadow-primary/20">
            <CardHeader className="flex flex-row items-center gap-4">
              <Briefcase className="w-8 h-8 text-primary" />
              <CardTitle>Professional Highlight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="font-semibold">{about.experience.role}</p>
              <p className="text-sm text-muted-foreground">{about.experience.company}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


export default function AboutSection() {
    const { isDataLoaded } = useData();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || !isDataLoaded) {
        return (
            <section id="about" className="w-full py-12 md:py-16 lg:py-20 bg-card">
                 <div className="container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
                    <Skeleton className="h-[500px] w-full" />
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-24 w-full" />
                         <div className="grid gap-6 sm:grid-cols-2">
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="w-full py-12 md:py-16 lg:py-20 bg-card">
            <AboutSectionContent />
        </section>
    );
}
