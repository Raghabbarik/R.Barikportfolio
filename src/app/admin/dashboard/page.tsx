"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioTable } from "@/components/admin/portfolio-table";
import { ProjectFormDialog } from "@/components/admin/project-form-dialog";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProjectsTab() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Add, edit, or remove projects from your portfolio.</CardDescription>
                </div>
                <ProjectFormDialog>
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Project
                        </span>
                    </Button>
                </ProjectFormDialog>
            </CardHeader>
            <CardContent>
                <PortfolioTable />
            </CardContent>
        </Card>
    );
}

function ComingSoonTab({ title }: { title: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    This section is under construction. Soon you'll be able to manage your {title.toLowerCase()} here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Coming Soon!</p>
                </div>
            </CardContent>
        </Card>
    )
}


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground md:text-xl/relaxed">
          Manage your portfolio content here.
        </p>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-4">
            <ProjectsTab />
        </TabsContent>
        <TabsContent value="skills" className="mt-4">
            <ComingSoonTab title="Skills" />
        </TabsContent>
        <TabsContent value="services" className="mt-4">
            <ComingSoonTab title="Services" />
        </TabsContent>
        <TabsContent value="about" className="mt-4">
            <ComingSoonTab title="About" />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
            <ComingSoonTab title="Settings" />
        </TabsContent>
      </Tabs>
    </div>
  );
}