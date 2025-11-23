
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
import { useData } from "@/lib/data-context";
import { Progress } from "@/components/ui/progress";
import { Upload, XCircle } from "lucide-react";
import Image from "next/image";

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
        return z.string().url("Image URL must be a valid URL").safeParse(data.imageUrl).success;
    }
    return true;
}, {
    message: "Image URL must be a valid URL",
    path: ["imageUrl"],
});

type ProjectFormData = z.infer<typeof formSchema>;

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ImageUploadField = ({ form }: { form: any }) => {
    const { uploadFile, uploadProgress, isUploading } = useData();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const imageUrl = form.watch("imageUrl");

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const uploadedUrl = await uploadFile(file, `projects/${Date.now()}_${file.name}`);
            if (uploadedUrl) {
                form.setValue("imageUrl", uploadedUrl, { shouldValidate: true });
            }
        }
    };

    const handleRemoveImage = () => {
        form.setValue("imageUrl", "", { shouldValidate: true });
    }

    return (
        <FormItem>
            <FormLabel>Project Image</FormLabel>
            {imageUrl ? (
                 <div className="relative group w-full h-48 rounded-md overflow-hidden border">
                    <Image src={imageUrl} alt="Project Image" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={handleRemoveImage}
                        >
                            <XCircle className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div 
                    className="w-full h-48 rounded-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50"
                    onClick={() => inputRef.current?.click()}
                >
                    {isUploading ? (
                        <>
                            <p className="text-sm text-muted-foreground mb-2">Uploading...</p>
                            <Progress value={uploadProgress} className="w-3/4" />
                        </>
                    ) : (
                        <>
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Click or drag to upload</p>
                        </>
                    )}
                </div>
            )}
             <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                disabled={isUploading}
            />
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
      imageUrl: project.imageUrl || "",
    },
  });

  const onSubmit = (values: ProjectFormData) => {
    const projectToSave: Project = {
        ...values,
        id: project.id,
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
            render={() => (
                <ImageUploadField form={form} />
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

    