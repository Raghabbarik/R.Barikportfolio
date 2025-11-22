"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
import type { Project } from "@/lib/definitions";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  technologies: z.string().min(1, { message: "Please add at least one technology." }),
  liveDemoUrl: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().min(1, { message: "Image URL is required." }),
  imageHint: z.string().min(1, { message: "Image hint is required." })
});

type ProjectFormData = z.infer<typeof formSchema>;

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectForm({ project, onSave, onDelete }: ProjectFormProps) {
  const [isEditing, setIsEditing] = React.useState(project.id.startsWith('new-project'));

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...project,
      technologies: project.technologies.join(", "),
    },
  });

  useEffect(() => {
    form.reset({
      ...project,
      technologies: project.technologies.join(", "),
    });
    if (project.id.startsWith('new-project-')) {
      setIsEditing(true);
    }
  }, [project, form]);

  const onSubmit = (values: ProjectFormData) => {
    const projectToSave: Project = {
        ...values,
        id: values.id.startsWith('new-project-') ? values.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now() : values.id,
        technologies: values.technologies.split(",").map(t => t.trim()),
    };
    onSave(projectToSave);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (project.id.startsWith('new-project')) {
      onDelete(project.id);
    } else {
      form.reset({
        ...project,
        technologies: project.technologies.join(", "),
      });
      setIsEditing(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-grow">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>{isEditing ? "Edit Project" : project.title}</CardTitle>
              {!isEditing && <CardDescription className="line-clamp-2">{project.description}</CardDescription>}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
                 <DeleteProjectAlert 
                    project={project} 
                    onDelete={() => onDelete(project.id)} 
                />
            </div>
          </CardHeader>
          {isEditing && (
              <>
                <CardContent className="space-y-4 flex-grow">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Title" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe your project" {...field} className="min-h-[100px]" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="technologies"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl>
                            <Input placeholder="React, Next.js, Tailwind CSS" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image Placeholder ID</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 'wonderlight-project'" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="imageHint"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image AI Hint</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. 'adventure website'" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="liveDemoUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Live Demo URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                <CardFooter className="gap-2">
                    <Button type="submit">Save</Button>
                    <Button type="button" variant="ghost" onClick={handleCancel}>Cancel</Button>
                </CardFooter>
            </>
          )}
        </form>
      </Form>
    </Card>
  );
}


function DeleteProjectAlert({ project, onDelete }: { project: Project, onDelete: () => void }) {
  
  const handleDelete = () => {
    onDelete();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-500 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Project</span>
        </Button>
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
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
