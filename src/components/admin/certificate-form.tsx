
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Certificate } from "@/lib/definitions";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { ImageUploadField } from "./image-upload-field";


const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  issuer: z.string().min(2, { message: "Issuer is required." }),
  year: z.string().min(4, { message: "Year is required." }).max(4),
  category: z.enum(["technical", "other"]),
  href: z.string().url().optional().or(z.literal("")),
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

type CertificateFormData = z.infer<typeof formSchema>;

interface CertificateFormProps {
  certificate: Certificate;
  onSave: (certificate: Certificate) => void;
  onDelete: (certificateId: string) => void;
}

export function CertificateForm({ certificate, onSave, onDelete }: CertificateFormProps) {
  const [isEditing, setIsEditing] = React.useState(certificate.id.startsWith('new-cert'));

  const form = useForm<CertificateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        ...certificate,
        imageUrl: certificate.imageUrl || "",
        href: certificate.href || "",
    },
  });

  useEffect(() => {
    form.reset({
        ...certificate,
        imageUrl: certificate.imageUrl || "",
        href: certificate.href || "",
    });
     if (certificate.id.startsWith('new-cert')) {
      setIsEditing(true);
    }
  }, [certificate, form]);

  const onSubmit = (values: CertificateFormData) => {
    onSave(values);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    if (certificate.id.startsWith('new-cert')) {
      onDelete(certificate.id);
    } else {
      form.reset(certificate);
      setIsEditing(false);
    }
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-row items-start justify-between">
            <CardTitle className="text-lg">{isEditing ? "Edit Certificate" : certificate.title}</CardTitle>
            <div className="flex items-center gap-2">
                {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
                 <DeleteCertificateAlert 
                    certificate={certificate} 
                    onDelete={() => onDelete(certificate.id)} 
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
                                <Input placeholder="Certificate Title" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="issuer"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Issuer</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Google" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                    <Input placeholder="2024" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="technical">Technical</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="imageUrl"
                        render={() => (
                            <ImageUploadField name="imageUrl" label="Certificate Image" folder="certificates" />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageHint"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Image AI Hint</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. 'certificate achievement'" {...field} />
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
                            <FormLabel>Certificate Link</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/certificate/123" {...field} />
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


function DeleteCertificateAlert({ certificate, onDelete }: { certificate: Certificate, onDelete: () => void }) {
  
  const handleDelete = () => {
    onDelete();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-500 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Certificate</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the certificate "{certificate.title}".
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
