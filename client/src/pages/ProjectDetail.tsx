import { useParams, Link } from "wouter";
import { PROJECTS } from "@/data/config";
import { ArrowLeft, ExternalLink, Github, Database, Code2, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

export default function ProjectDetail() {
  const params = useParams();
  const rawProject = PROJECTS.find(p => p.id === params.id);

  if (!rawProject) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <Button asChild variant="outline">
          <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects</Link>
        </Button>
      </div>
    );
  }

  // Inject real imported image URLs
  const project = {
    ...rawProject,
    visuals: rawProject.visuals.map(v => imageMap[v] || v)
  };

  return (
    <div className="container max-w-6xl py-12 md:py-20">
      <Link href="/projects">
        <span className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 cursor-pointer transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
        </span>
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline" className="font-mono text-primary border-primary/30 bg-primary/5">
            {project.role}
          </Badge>
          {project.featured && <Badge variant="default" className="font-mono">Featured</Badge>}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{project.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {project.short_summary}
        </p>
      </div>

      {project.visuals[0] && (
        <div className={`w-full rounded-xl overflow-hidden border mb-12 shadow-sm relative group bg-muted/20 flex justify-center items-center ${project.id === 'pet-classifier' ? 'aspect-auto py-12' : 'aspect-[4/3]'}`}>
          <img 
            src={project.visuals[0]} 
            alt={`${project.title} - Overview`} 
            className={`object-contain ${project.id === 'pet-classifier' ? 'h-[400px] w-auto rounded-xl shadow-2xl' : 'w-full h-full p-4'}`}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-8 lg:gap-16 items-start">
        {/* Main Content (Left) */}
        <div className="flex-1 space-y-12 w-full min-w-0">
          {project.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">
                {section.title}
              </h2>

              {section.type === "list" ? (
                <ul className="space-y-3">
                  {section.items?.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary font-bold">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground leading-relaxed">
                  {section.content?.split('\n').map((line, i, arr) => {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith('-')) {
                      return (
                        <div key={i} className="flex gap-3 my-2 ml-1">
                          <span className="text-primary font-bold">•</span>
                          <span>{trimmedLine.substring(1).trim()}</span>
                        </div>
                      );
                    }
                    return (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
          
          {project.visuals[1] && (
            <section className="my-12">
              <div className="rounded-xl overflow-hidden border shadow-sm relative group bg-muted/20">
                <img 
                  src={project.visuals[1]} 
                  alt={`${project.title} - Interface Dashboard Details`} 
                  className="w-full h-auto object-contain p-2"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 font-mono italic">High-fidelity dashboard interface design focusing on key institutional metrics.</p>
            </section>
          )}

          <Separator />

          {/* Meta Section */}
          <div className="grid md:grid-cols-2 gap-16 py-12 mt-16 border-t-2 border-primary/10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Key Design Decisions
                </h3>
              </div>
              <ul className="space-y-5">
                {project.key_design_decisions?.map((point, i) => (
                  <li key={i} className="text-base flex gap-4 leading-relaxed">
                    <span className="text-primary font-bold text-lg mt-[-2px]">•</span> 
                    <span className="text-foreground/90">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-mono text-sm font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Future Improvements
                </h3>
              </div>
              <ul className="space-y-5">
                {project.what_i_would_improve_next?.map((point, i) => (
                  <li key={i} className="text-base flex gap-4 leading-relaxed">
                    <span className="text-muted-foreground/50 font-bold text-lg mt-[-2px]">•</span> 
                    <span className="text-foreground/90">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <aside className="w-full sm:w-64 md:w-72 lg:w-80 shrink-0 sm:sticky sm:top-24 space-y-8 bg-muted/20 border rounded-xl p-6 shadow-sm self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <Server className="h-4 w-4" /> Project Links
            </h3>
            <div className="flex flex-col gap-3">
              {project.links.demo && (
                <Button asChild className="w-full font-mono font-medium shadow-sm">
                  <Link href={project.links.demo}>
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
              {project.links.github && (
                <Button asChild variant="outline" className="w-full font-mono font-medium border-border/60 hover:bg-muted/50">
                  <a href={project.links.github} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Source
                  </a>
                </Button>
              )}
              {Object.keys(project.links).length === 0 && (
                <div className="p-3 bg-muted/50 rounded-md border border-dashed border-border/50 text-center">
                  <span className="text-xs text-muted-foreground font-mono">Internal/Proprietary</span>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-border/40" />

          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <Code2 className="h-4 w-4" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map(tech => (
                <Badge key={tech} variant="secondary" className="font-mono text-xs font-normal border-transparent bg-secondary/80 hover:bg-secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="bg-border/40" />

          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" /> Data Source
            </h3>
            <p className="text-sm leading-relaxed text-foreground/90">{project.dataset_source}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
