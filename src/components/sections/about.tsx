"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useData } from "@/lib/data-context";
import { Briefcase, GraduationCap } from "lucide-react";

export default function AboutSection() {
  const { about } = useData();
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-image");

  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-card">
      <div className="container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              data-ai-hint={aboutImage.imageHint}
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          )}
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{about.tagline}</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {about.title}
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed">
              {about.description}
            </p>
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
    </section>
  );
}
