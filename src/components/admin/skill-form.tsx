
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
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
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

import type { Skill } from "@/lib/definitions";
import { iconNames, getIcon } from "@/lib/get-icon";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  level: z.number().min(0).max(100),
  icon: z.string().min(1, { message: "Icon is required." }),
});

type SkillFormData = z.infer<typeof formSchema>;

interface SkillFormProps {
  skill: Skill;
  onSave: (skill: Skill) => void;
  onDelete: (skillId: string) => void;
}

export function SkillForm({ skill, onSave, onDelete }: SkillFormProps) {
    const [isEditing, setIsEditing] = React.useState(skill.id.startsWith('new-skill-'));

  const form = useForm<SkillFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        id: skill.id,
        name: skill.name,
        level: skill.level,
        icon: (skill.icon as any)?.displayName || "PlusCircle",
    },
  });

   useEffect(() => {
    form.reset({
        id: skill.id,
        name: skill.name,
        level: skill.level,
        icon: (skill.icon as any)?.displayName || "PlusCircle",
    });
     if (skill.id.startsWith('new-skill-')) {
      setIsEditing(true);
    }
  }, [skill, form]);

  async function onSubmit(values: SkillFormData) {
    const skillToSave: Skill = {
        ...values,
        id: values.id.startsWith('new-skill-') ? values.name.toLowerCase().replace(/\s+/g, '-') + Date.now() : values.id,
        icon: getIcon(values.icon),
    };
    onSave(skillToSave);
    setIsEditing(false);
  }

  const handleCancel = () => {
    if (skill.id.startsWith('new-skill-')) {
        onDelete(skill.id);
    } else {
        form.reset({
            id: skill.id,
            name: skill.name,
            level: skill.level,
            icon: (skill.icon as any)?.displayName || "PlusCircle",
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
              <CardTitle className="text-base">{isEditing ? "Edit Skill" : skill.name}</CardTitle>
            </div>
             <div className="flex items-center gap-2">
                {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
                 <DeleteSkillAlert 
                    skill={skill} 
                    onDelete={() => onDelete(skill.id)} 
                />
            </div>
          </CardHeader>
          {isEditing && (
            <>
            <CardContent className="space-y-4 flex-grow">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Skill Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Proficiency Level: {field.value}%</FormLabel>
                    <FormControl>
                        <Slider 
                            defaultValue={[field.value]} 
                            onValueChange={(value) => field.onChange(value[0])}
                            max={100} 
                            step={1} 
                        />
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


function DeleteSkillAlert({ skill, onDelete }: { skill: Skill, onDelete: () => void }) {

  const handleDelete = () => {
    onDelete();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-500 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Skill</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the skill "{skill.name}".
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
