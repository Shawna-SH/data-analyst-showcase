import { useState } from "react";
import { PROJECTS, Project } from "@/data/config";
import { ProjectCard } from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";

// Import project images to satisfy Vite's static asset requirements
import anuDashboardPosterImg from "@/assets/images/anu-dashboard-poster.jpg";
import anuDashboardUiImg from "@/assets/images/anu-dashboard-ui.jpg";
import petClassifierImg from "@/assets/images/pet-classifier-new.jpeg";
import companyEnrichmentImg from "@/assets/images/company-enrichment-architecture.png";

const imageMap: Record<string, string> = {
  "/assets/images/anu-dashboard-poster.jpg": anuDashboardPosterImg,
  "/assets/images/anu-dashboard-ui.jpg": anuDashboardUiImg,
  "/assets/images/pet-classifier.png": petClassifierImg,
  "/assets/images/company-enrichment-architecture.png": companyEnrichmentImg,
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort();

  // Filter projects
  const filteredProjects = PROJECTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.short_summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag ? p.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  }).map(p => ({
    ...p,
    visuals: p.visuals.map(v => imageMap[v] || v)
  }));

  return (
    <div className="container py-12 md:py-20 min-h-screen">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">All Projects</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive look at my work spanning data analysis, engineering, and machine learning.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between bg-muted/30 p-4 rounded-lg border">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
          <Badge 
            variant={activeTag === null ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap shrink-0"
            onClick={() => setActiveTag(null)}
          >
            All
          </Badge>
          {allTags.map(tag => (
            <Badge 
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap shrink-0"
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project as Project} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border rounded-lg border-dashed">
          <p className="text-muted-foreground font-mono">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
