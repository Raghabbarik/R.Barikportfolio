
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutForm } from "@/components/admin/about-form";
import { ContactForm as AdminContactForm } from "@/components/admin/contact-form";
import { ProjectForm } from "@/components/admin/project-form";
import { ServiceForm } from "@/components/admin/service-form";
import { SkillForm } from "@/components/admin/skill-form";
import type {
    About,
    ContactDetail,
    Project,
    Service,
    Skill,
} from "@/lib/definitions";
import { useData } from "@/lib/data-context";
import { PlusCircle, Save, Loader2, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProjectCardPreview } from "@/components/admin/project-card-preview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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


function AdminProjectCard({ project, onEdit, onDelete }: { project: Project; onEdit: () => void; onDelete: () => void; }) {
    return (
        <div className="relative group">
            <ProjectCardPreview project={project} />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <Button variant="outline" size="sm" onClick={onEdit}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
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
                            onClick={onDelete}
                        >
                            Delete
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

function ProjectsTab() {
  const { projects, setProjects } = useData();
  const { toast } = useToast();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isDialogOpen) {
        setEditingProject(null);
    }
  }, [isDialogOpen]);

  const handleSave = (updatedProject: Project) => {
    setProjects((prev) => {
        const exists = prev.some(p => p.id === updatedProject.id);
        if (exists) {
            return prev.map((p) => (p.id === updatedProject.id ? updatedProject : p));
        }
        return [updatedProject, ...prev];
    });
    setIsDialogOpen(false);
    toast({
      title: "Project Saved!",
      description: `The project "${updatedProject.title}" has been saved.`,
    });
  };

  const handleDelete = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    toast({
      variant: "destructive",
      title: "Project Deleted",
      description: "The project has been removed.",
    });
  };

  const handleAdd = () => {
    const newProject: Project = {
      id: `new-project-${Date.now()}`,
      title: "New Project",
      description: "A brief description of your awesome new project.",
      technologies: [],
      imageUrl: "",
      imageHint: "",
      liveDemoUrl: "",
    };
    setEditingProject(newProject);
    setIsDialogOpen(true);
  };
  
  const handleEdit = (project: Project) => {
      setEditingProject(project);
      setIsDialogOpen(true);
  }
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            Add, edit, or remove projects from your portfolio.
          </p>
        </div>
         <Button size="sm" className="h-8 gap-1" onClick={handleAdd}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Project
            </span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
              <AdminProjectCard 
                  key={project.id} 
                  project={project}
                  onEdit={() => handleEdit(project)}
                  onDelete={() => handleDelete(project.id)}
              />
          ))}
      </div>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            {editingProject && (
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{editingProject.id.startsWith('new-') ? 'Add New Project' : 'Edit Project'}</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto p-1 pr-4">
                        <ProjectForm
                            project={editingProject}
                            onSave={handleSave}
                            onCancel={handleDialogClose}
                        />
                    </div>
                </DialogContent>
            )}
       </Dialog>
    </div>
  );
}

function SkillsTab() {
  const { skills, setSkills } = useData();
  const { toast } = useToast();

  const handleSave = (updatedSkill: Skill) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === updatedSkill.id ? updatedSkill : s))
    );
     toast({
      title: "Skill Saved!",
      description: `The skill "${updatedSkill.name}" has been updated.`,
    });
  };

  const handleDelete = (skillId: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== skillId));
    toast({
      variant: "destructive",
      title: "Skill Deleted",
      description: `The skill has been removed.`,
    });
  };

  const handleAdd = () => {
    const newSkill: Skill = {
      id: `new-skill-${Date.now()}`,
      name: `New Skill`,
      level: 50,
      icon: PlusCircle,
    };
    setSkills((prev) => [newSkill, ...prev]);
    toast({
        title: "New Skill Added",
        description: "You can now edit the new skill's details.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-muted-foreground">
            Manage your skills and proficiency levels.
          </p>
        </div>
        <Button size="sm" className="h-8 gap-1" onClick={handleAdd}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Skill
          </span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <SkillForm
            key={skill.id}
            skill={skill}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

function ServicesTab() {
  const { services, setServices } = useData();
  const { toast } = useToast();

  const handleSave = (updatedService: Service) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    toast({
      title: "Service Saved!",
      description: `The service "${updatedService.title}" has been updated.`,
    });
  };

  const handleDelete = (serviceId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
     toast({
      variant: "destructive",
      title: "Service Deleted",
      description: `The service has been removed.`,
    });
  };

  const handleAdd = () => {
    const newService: Service = {
      id: `new-service-${Date.now()}`,
      title: `New Service`,
      description: "",
      icon: PlusCircle,
    };
    setServices((prev) => [newService, ...prev]);
    toast({
        title: "New Service Added",
        description: "You can now edit the new service's details.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Services</h2>
          <p className="text-muted-foreground">Manage the services you offer.</p>
        </div>
        <Button size="sm" className="h-8 gap-1" onClick={handleAdd}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Service
          </span>
        </Button>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceForm
            key={service.id}
            service={service}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

function AboutTab() {
  const { about, setAbout } = useData();
  const { toast } = useToast();

  const handleSave = (about: About) => {
    setAbout(about);
    toast({
      title: "About Section Saved!",
      description: `Your "About Me" section has been updated.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">About Section</h2>
        <p className="text-muted-foreground">
          Update the content of your about section.
        </p>
      </div>
      <AboutForm about={about} onSave={handleSave} />
    </div>
  );
}

function SettingsTab() {
  const { contactDetails, setContactDetails } = useData();
  const { toast } = useToast();

  const handleSave = (contact: ContactDetail) => {
    setContactDetails((prev) =>
      prev.map((c) => (c.id === contact.id ? contact : c))
    );
     toast({
      title: "Contact Detail Saved!",
      description: `The detail for "${contact.text}" has been updated.`,
    });
  };

  const handleDelete = (contactId: string) => {
    setContactDetails((prev) => prev.filter((c) => c.id !== contactId));
     toast({
      variant: "destructive",
      title: "Contact Deleted",
      description: `The contact detail has been removed.`,
    });
  };

  const handleAdd = () => {
    const newContact: ContactDetail = {
      id: `new-contact-${Date.now()}`,
      iconName: "Mail",
      text: "new.contact@example.com",
      href: "mailto:new.contact@example.com",
    };
    setContactDetails((prev) => [newContact, ...prev]);
     toast({
        title: "New Contact Added",
        description: "You can now edit the new contact's details.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contact Details</h2>
          <p className="text-muted-foreground">
            Manage your contact information.
          </p>
        </div>
        <Button size="sm" className="h-8 gap-1" onClick={handleAdd}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Contact
          </span>
        </Button>
      </div>
      <div className="space-y-4">
        {contactDetails.map((contact) => (
          <AdminContactForm
            key={contact.id}
            contact={contact}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [isSaving, setIsSaving] = useState(false);
  const { saveAllData } = useData();

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await saveAllData();
    } catch (error) {
       // Errors are handled via toast within the saveAllData function
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Manage your portfolio content here.
          </p>
        </div>
        <Button onClick={handleSaveAll} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <ScrollArea className="w-full">
            <TabsList className="grid w-max grid-flow-col gap-4">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="projects" className="mt-4">
          <ProjectsTab />
        </TabsContent>
        <TabsContent value="skills" className="mt-4">
          <SkillsTab />
        </TabsContent>
        <TabsContent value="services" className="mt-4">
          <ServicesTab />
        </TabsContent>
        <TabsContent value="about" className="mt-4">
          <AboutTab />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
