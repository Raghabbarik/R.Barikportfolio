
"use client";

import Image from "next/image";
import Link from "next/link";
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
import type { Project } from "@/lib/definitions";
import { useData } from "@/lib/data-context";

interface ProjectCardPreviewProps {
  project: Project;
}

export function ProjectCardPreview({ project }: ProjectCardPreviewProps) {
  const { isDataLoaded } = useData();

  if (!isDataLoaded) {
    return (
        <Card className="flex items-center justify-center h-96 border-dashed">
            <p className="text-muted-foreground">Loading Preview...</p>
        </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-border/20 flex flex-col">
      <div className="relative group aspect-video bg-muted">
        {project.imageUrl && project.imageUrl.length > 0 ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            data-ai-hint={project.imageHint}
            fill
            className="object-cover"
          />
        ) : (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground text-sm">No image selected</p>
            </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
          <CardDescription className="pt-2 min-h-[40px]">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-0 mt-4">
          <h3 className="font-semibold mb-2">Technologies Used:</h3>
          <div className="flex flex-wrap gap-2 min-h-[24px]">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-6">
          {project.liveDemoUrl ? (
            <Button asChild>
              <Link
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
             <Button disabled>
                View Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
