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

const imageMap: Record<string, string> = {
  "/assets/images/anu-dashboard-poster.jpg": anuDashboardPosterImg,
  "/assets/images/anu-dashboard-ui.jpg": anuDashboardUiImg,
  "/assets/images/pet-classifier.png": petClassifierImg,
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
    <div className="container max-w-4xl py-12 md:py-20">
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
        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border mb-12 shadow-sm relative group bg-muted/20">
          <img 
            src={project.visuals[0]} 
            alt={`${project.title} - Overview`} 
            className="w-full h-full object-contain p-4"
          />
        </div>
      )}

      {/* Meta Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-xl border mb-12">
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <Code2 className="h-4 w-4" /> Tech Stack
          </h3>
          <div className="flex flex-wrap gap-1">
            {project.tech_stack.map(tech => (
              <Badge key={tech} variant="secondary" className="font-mono text-xs">{tech}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <Database className="h-4 w-4" /> Data Source
          </h3>
          <p className="text-sm font-medium">{project.dataset_source}</p>
        </div>
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <Server className="h-4 w-4" /> Links
          </h3>
          <div className="flex flex-col gap-2">
            {project.links.github && (
              <a href={project.links.github} className="text-sm font-medium hover:text-primary flex items-center gap-2 transition-colors">
                <Github className="h-4 w-4" /> View Source
              </a>
            )}
            {project.links.demo && (
              <Link href={project.links.demo} className="text-sm font-medium hover:text-primary flex items-center gap-2 transition-colors cursor-pointer">
                <ExternalLink className="h-4 w-4" /> Live Demo
              </Link>
            )}
            {Object.keys(project.links).length === 0 && <span className="text-sm text-muted-foreground">Internal/Proprietary</span>}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">Problem & Context</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.problem}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">Approach & Architecture</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.approach}</p>
        </section>
        
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

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">Key Results</h2>
          <ul className="space-y-3">
            {project.key_results.map((result, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <span className="text-primary font-bold">•</span> 
                <span className="leading-relaxed">{result}</span>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        {/* Interview/Meta Section */}
        <div className="grid md:grid-cols-2 gap-8 bg-card border rounded-xl p-8 shadow-sm">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
              Interview Talking Points
            </h3>
            <ul className="space-y-2">
              {project.interview_talking_points.map((point, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary/50">-</span> {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-muted-foreground rounded-full inline-block"></span>
              Future Improvements
            </h3>
            <ul className="space-y-2">
              {project.what_i_would_improve_next.map((point, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-muted-foreground/50">-</span> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
