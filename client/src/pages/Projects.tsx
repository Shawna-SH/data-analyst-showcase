import { useState } from "react";
import { PROJECTS, Project } from "@/data/config";
import { ProjectCard } from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Import project images to satisfy Vite's static asset requirements
import anuDashboardPosterImg from "@/assets/images/anu-dashboard-poster.jpg";
import anuDashboardUiImg from "@/assets/images/anu-dashboard-ui.jpg";
import petClassifierImg from "@/assets/images/pet-classifier-new.jpeg";
import companyEnrichmentImg from "@/assets/images/company-enrichment-architecture.png";
import chongqingNoodleImg from "@/assets/images/chongqing-street-noodle.png";

const imageMap: Record<string, string> = {
  "/assets/images/anu-dashboard-poster.jpg": anuDashboardPosterImg,
  "/assets/images/anu-dashboard-ui.jpg": anuDashboardUiImg,
  "/assets/images/pet-classifier.png": petClassifierImg,
  "/assets/images/company-enrichment-architecture.png": companyEnrichmentImg,
  "/assets/images/chongqing-street-noodle.png": chongqingNoodleImg,
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort();

  // Filter projects
  const filteredProjects = PROJECTS.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === "" || 
                          p.title.toLowerCase().includes(searchLower) || 
                          p.short_summary.toLowerCase().includes(searchLower) ||
                          p.role.toLowerCase().includes(searchLower) ||
                          p.tags.some(t => t.toLowerCase().includes(searchLower)) ||
                          p.tech_stack.some(t => t.toLowerCase().includes(searchLower));
                          
    const matchesTag = activeTag ? p.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  }).map(p => ({
    ...p,
    visuals: p.visuals.map(v => imageMap[v] || v)
  }));

  return (
    <div className="container py-12 md:py-20 min-h-screen">
      <Helmet>
        <title>Data Analytics & Machine Learning Projects | Ruipu Shi</title>
        <meta name="description" content="Explore my data engineering, machine learning, and data analysis projects, including scalable pipelines, classification models, and interactive dashboards." />
        <meta property="og:title" content="Data Analytics & Machine Learning Projects | Ruipu Shi" />
        <meta property="og:description" content="Explore my data engineering, machine learning, and data analysis projects, including scalable pipelines, classification models, and interactive dashboards." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ruipushi.com/projects" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Analytics & Machine Learning Projects | Ruipu Shi" />
        <meta name="twitter:description" content="Explore my data engineering, machine learning, and data analysis projects." />
      </Helmet>

      <div className="max-w-2xl mb-12">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Data Analytics & Machine Learning Projects</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive look at my work spanning data analysis, engineering, and machine learning pipelines.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-6 mb-10 bg-muted/30 p-6 rounded-xl border">
        <div className="relative w-full md:max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search projects by title, description, or keyword..." 
            className="pl-11 bg-background h-12 text-base border-muted-foreground/20 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filter by Technology & Domain
            </div>
            {activeTag && (
              <button 
                onClick={() => setActiveTag(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Clear filter
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2 max-h-32 overflow-y-auto pr-2 pb-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            <Badge 
              variant={activeTag === null ? "default" : "outline"}
              className={`cursor-pointer px-4 py-1.5 text-sm transition-all hover:-translate-y-0.5 ${activeTag === null ? 'shadow-md' : 'bg-background hover:bg-muted'}`}
              onClick={() => setActiveTag(null)}
            >
              All Projects
            </Badge>
            {allTags.map(tag => (
              <Badge 
                key={tag}
                variant={activeTag === tag ? "default" : "outline"}
                className={`cursor-pointer px-3 py-1.5 transition-all hover:-translate-y-0.5 ${activeTag === tag ? 'shadow-md' : 'bg-background hover:bg-muted font-normal text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
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
