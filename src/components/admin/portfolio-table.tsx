"use client";

import Image from "next/image";
import { MoreHorizontal, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { projects } from "@/lib/data"; // Using static data
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ProjectFormDialog } from "./project-form-dialog";
import type { Project } from "@/lib/definitions";

export function PortfolioTable() {
  // In a real app, you would fetch and manage this state
  const currentProjects = projects;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Technologies</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentProjects.map((project) => {
          const projectImage = PlaceHolderImages.find(
            (img) => img.id === project.imageUrl
          );
          return (
            <TableRow key={project.id}>
              <TableCell className="hidden sm:table-cell">
                {projectImage && (
                  <Image
                    alt={project.title}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={projectImage.imageUrl}
                    data-ai-hint={projectImage.imageHint}
                    width="64"
                  />
                )}
              </TableCell>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <ProjectFormDialog projectToEdit={project}>
                      <button className="w-full">
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            Edit
                        </DropdownMenuItem>
                      </button>
                    </ProjectFormDialog>
                    <DeleteProjectAlert project={project} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function DeleteProjectAlert({ project }: { project: Project }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full">
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500"
            onSelect={(e) => e.preventDefault()}
          >
            Delete
          </DropdownMenuItem>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the project "{project.title}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => console.log(`Deleting ${project.id}`)} // Placeholder for delete logic
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
