
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
  CardFooter,
  CardHeader,
  CardTitle,
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
import type { Thought } from "@/lib/definitions";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { ImageUploadField } from "./image-upload-field";

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters." }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format." }),
  readTime: z.coerce.number().min(1, { message: "Read time must be at least 1." }),
  href: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
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

type ThoughtFormData = z.infer<typeof formSchema>;

interface ThoughtFormProps {
  thought: Thought;
  onSave: (thought: Thought) => void;
  onDelete: (thoughtId: string) => void;
}

export function ThoughtForm({ thought, onSave, onDelete }: ThoughtFormProps) {
  const [isEditing, setIsEditing] = React.useState(thought.id.startsWith('new-'));

  const form = useForm<ThoughtFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        ...thought,
        imageUrl: thought.imageUrl || "",
        href: thought.href || "#",
    },
  });

  useEffect(() => {
    form.reset({
        ...thought,
        imageUrl: thought.imageUrl || "",
        href: thought.href || "#",
    });
     if (thought.id.startsWith('new-')) {
      setIsEditing(true);
    }
  }, [thought, form]);

  const onSubmit = (values: ThoughtFormData) => {
    onSave(values);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    if (thought.id.startsWith('new-')) {
      onDelete(thought.id);
    } else {
      form.reset(thought);
      setIsEditing(false);
    }
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-row items-start justify-between">
            <CardTitle className="text-lg">{isEditing ? "Edit Thought" : thought.title}</CardTitle>
            <div className="flex items-center gap-2">
                {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
                 <DeleteThoughtAlert 
                    thought={thought} 
                    onDelete={() => onDelete(thought.id)} 
                />
            </div>
          </CardHeader>
          {isEditing && (
            <>
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Thought Title" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Excerpt</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A short summary of your thought" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="readTime"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Read Time (minutes)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="imageUrl"
                        render={() => (
                            <ImageUploadField name="imageUrl" label="Thought Image" folder="thoughts" />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageHint"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Image AI Hint</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. 'AI abstract'" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="href"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Article Link</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/blog/my-thought" {...field} />
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

function DeleteThoughtAlert({ thought, onDelete }: { thought: Thought, onDelete: () => void }) {
  const handleDelete = () => {
    onDelete();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-500 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Thought</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the thought "{thought.title}".
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
