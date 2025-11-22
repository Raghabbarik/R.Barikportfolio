
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
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import type { About } from "@/lib/definitions";
import React from "react";
import { Upload } from "lucide-react";

const formSchema = z.object({
  tagline: z.string().min(1, "Tagline is required."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  education: z.object({
    degree: z.string().min(1, "Degree is required."),
    institution: z.string().min(1, "Institution is required."),
  }),
  experience: z.object({
    role: z.string().min(1, "Role is required."),
    company: z.string().min(1, "Company is required."),
  }),
  profileImageUrl: z.string().url("Please enter a valid URL.").or(z.string().startsWith("data:image/")),
  profileImageHint: z.string().min(1, "Profile image hint is required."),
  aboutImageUrl: z.string().url("Please enter a valid URL.").or(z.string().startsWith("data:image/")),
  aboutImageHint: z.string().min(1, "About image hint is required."),
});

type AboutFormData = z.infer<typeof formSchema>;

interface AboutFormProps {
  about: About;
  onSave: (about: About) => void;
}

const ImageUploadField = ({ field, form, name }: { field: any, form: any, name: "profileImageUrl" | "aboutImageUrl" }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                form.setValue(name, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <FormItem>
            <FormLabel>{name === 'profileImageUrl' ? 'Hero Image URL' : 'About Section Image URL'}</FormLabel>
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


export function AboutForm({ about, onSave }: AboutFormProps) {

  const form = useForm<AboutFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: about,
  });

  async function onSubmit(values: AboutFormData) {
    onSave(values);
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Edit About Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                        <Input placeholder="About Me" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder="A little bit about me" {...field} />
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
                    <Textarea placeholder="Describe yourself" {...field} className="min-h-[120px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-4 rounded-lg border p-4">
                  <h3 className="font-semibold">Images</h3>
                   <FormField
                    control={form.control}
                    name="profileImageUrl"
                    render={({ field }) => (
                      <ImageUploadField field={field} form={form} name="profileImageUrl" />
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="profileImageHint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Image AI Hint</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 'man portrait'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="aboutImageUrl"
                    render={({ field }) => (
                      <ImageUploadField field={field} form={form} name="aboutImageUrl" />
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="aboutImageHint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Image AI Hint</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 'code abstract'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold">Education</h3>
                        <FormField
                        control={form.control}
                        name="education.degree"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                                <Input placeholder="B.Tech, 2nd Year" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="education.institution"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Institution</FormLabel>
                            <FormControl>
                                <Input placeholder="Nalanda Institute of Technology" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold">Experience</h3>
                        <FormField
                        control={form.control}
                        name="experience.role"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Input placeholder="Website Developer" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="experience.company"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input placeholder="at Stoup" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
