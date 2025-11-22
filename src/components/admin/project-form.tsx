
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
import type { Project } from "@/lib/definitions";
import React from "react";
import { Upload } from "lucide-react";

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  technologies: z.string().min(1, { message: "Please add at least one technology." }),
  liveDemoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  imageHint: z.string().min(1, { message: "Image hint is required." })
}).refine(data => {
    if (data.imageUrl && data.imageUrl.length > 0) {
        return z.string().url("Image URL must be a valid URL").or(z.string().startsWith("data:image/", { message: "Image must be a data URI" })).safeParse(data.imageUrl).success;
    }
    return true;
}, {
    message: "Image URL must be a valid URL or a data URI",
    path: ["imageUrl"],
});

type ProjectFormData = z.infer<typeof formSchema>;

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ImageUploadField = ({ field, form }: { field: any, form: any }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                form.setValue("imageUrl", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <FormItem>
            <FormLabel>Image URL</FormLabel>
            <div className="flex gap-2">
                <FormControl>
                    <Input placeholder="https://images.unsplash.com/..." {...field} />
                </FormControl>
                <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload</span>
                </Button>
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>
            <FormMessage />
        </FormItem>
    );
};

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...project,
      technologies: project.technologies.join(", "),
    },
  });

  const onSubmit = (values: ProjectFormData) => {
    const projectToSave: Project = {
        ...values,
        id: project.id, // ensure id is not lost
        technologies: values.technologies.split(",").map(t => t.trim()).filter(t => t),
        imageUrl: values.imageUrl || "",
        liveDemoUrl: values.liveDemoUrl || "",
    };
    onSave(projectToSave);
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <ImageUploadField field={field} form={form} />
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
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
      </Form>
  );
}
