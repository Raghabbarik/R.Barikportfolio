import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PortfolioTable } from "@/components/admin/portfolio-table";
import { ProjectFormDialog } from "@/components/admin/project-form-dialog";

export default function PortfolioAdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tighter">Portfolio Projects</h1>
            <p className="text-muted-foreground">Manage your showcased projects.</p>
        </div>
        
        <ProjectFormDialog>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Project
              </span>
            </Button>
        </ProjectFormDialog>

      </div>
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            A list of all projects in your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PortfolioTable />
        </CardContent>
      </Card>
    </div>
  );
}
