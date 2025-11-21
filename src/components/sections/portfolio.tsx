"use client";

import Image from "next/image";
import Link from "next/link";
import { useData } from "@/lib/data-context";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function PortfolioSection() {
  const { projects } = useData();
  return (
    <section id="portfolio" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              My Projects
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of projects I've worked on.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 py-12">
          {projects.map((project) => {
            const projectImage = PlaceHolderImages.find(
              (img) => img.id === project.imageUrl
            );
            return (
              <Card
                key={project.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 border border-border/20 flex flex-col"
              >
                <div className="relative group aspect-video">
                  {projectImage && (
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.title}
                      data-ai-hint={projectImage.imageHint}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="pt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-0 mt-4">
                    <h3 className="font-semibold mb-2">Technologies Used:</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 mt-6">
                    {project.liveDemoUrl && (
                      <Button asChild>
                        <Link href={project.liveDemoUrl}>
                          View Project <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
