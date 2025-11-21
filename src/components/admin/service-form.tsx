
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
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
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
import type { Service } from "@/lib/definitions";
import { iconNames, getIcon } from "@/lib/get-icon";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  icon: z.string().min(1, { message: "Icon is required." }),
});

type ServiceFormData = z.infer<typeof formSchema>;

interface ServiceFormProps {
  service: Service;
  onSave: (service: Service) => void;
  onDelete: (serviceId: string) => void;
}

export function ServiceForm({ service, onSave, onDelete }: ServiceFormProps) {
  const [isEditing, setIsEditing] = React.useState(service.id.startsWith('new-service-'));
  
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        id: service.id,
        title: service.title,
        description: service.description,
        icon: (service.icon as any)?.displayName || "PlusCircle",
    },
  });

  useEffect(() => {
    form.reset({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: (service.icon as any)?.displayName || "PlusCircle",
    });
     if (service.id.startsWith('new-service-')) {
      setIsEditing(true);
    }
  }, [service, form]);

  const onSubmit = (values: ServiceFormData) => {
    const serviceToSave: Service = {
        ...values,
        id: values.id.startsWith('new-service-') ? values.title.toLowerCase().replace(/\s+/g, '-') + Date.now() : values.id,
        icon: getIcon(values.icon),
    };
    onSave(serviceToSave);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    if (service.id.startsWith('new-service-')) {
      onDelete(service.id);
    } else {
      form.reset({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: (service.icon as any)?.displayName || "PlusCircle",
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
              <CardTitle>{isEditing ? "Edit Service" : service.title}</CardTitle>
              {!isEditing && <CardDescription className="truncate">{service.description}</CardDescription>}
            </div>
            <div className="flex items-center gap-2">
                {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
                <DeleteServiceAlert 
                    service={service} 
                    onDelete={() => onDelete(service.id)} 
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
                            <Input placeholder="Service Title" {...field} />
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
                        <Textarea placeholder="Describe the service" {...field} className="min-h-[100px]" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an icon" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {iconNames.map(name => (
                                    <SelectItem key={name} value={name}>{name}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
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


function DeleteServiceAlert({ service, onDelete }: { service: Service, onDelete: () => void }) {
  
  const handleDelete = () => {
    onDelete();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-500 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Service</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the service "{service.title}".
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
