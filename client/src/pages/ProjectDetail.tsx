import { useParams, Link } from "wouter";
import { PROJECTS } from "@/data/config";
import { ArrowLeft, ExternalLink, Github, Database, Code2, Server, Globe, AppWindow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet-async";
import { ProjectCard } from "@/components/ProjectCard";

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

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.short_summary,
    "url": `https://ruipushi.com/projects/${project.id}`,
    "author": {
      "@type": "Person",
      "name": "Ruipu Shi"
    }
  };

  const getRelatedProjects = (currentProject: typeof rawProject, allProjects: typeof PROJECTS) => {
    const others = allProjects.filter(p => p.id !== currentProject.id);
    
    const scored = others.map(p => {
      const sharedTags = p.tags.filter(tag => currentProject.tags.includes(tag)).length;
      return { ...p, score: sharedTags };
    });
    
    // Sort by shared tags descending
    scored.sort((a, b) => b.score - a.score);
    
    // Return top 2 matches. If scores are 0, it simply returns the first few remaining projects.
    return scored.slice(0, 2).map(p => {
      const { score, ...projectData } = p;
      return projectData;
    });
  };

  const relatedProjects = getRelatedProjects(rawProject, PROJECTS).map(p => ({
    ...p,
    visuals: p.visuals.map(v => imageMap[v] || v)
  }));

  return (
    <div className="container max-w-6xl py-12 md:py-20">
      <Helmet>
        <title>{`${project.title} | Data Engineering & Analytics Project | Ruipu Shi`}</title>
        <meta name="description" content={project.short_summary} />
        <meta property="og:title" content={`${project.title} | Ruipu Shi Portfolio`} />
        <meta property="og:description" content={project.short_summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://ruipushi.com/projects/${project.id}`} />
        {project.visuals[0] && <meta property="og:image" content={`https://ruipushi.com${project.visuals[0]}`} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} | Ruipu Shi`} />
        <meta name="twitter:description" content={project.short_summary} />
        {project.visuals[0] && <meta name="twitter:image" content={`https://ruipushi.com${project.visuals[0]}`} />}
        <script type="application/ld+json">
          {JSON.stringify(projectSchema)}
        </script>
      </Helmet>

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
        <div className={`w-full rounded-xl overflow-hidden border mb-12 shadow-sm relative group bg-muted/20 flex justify-center items-center ${project.id === 'pet-image-classifier' ? 'aspect-auto py-12' : 'aspect-[4/3]'}`}>
          <img 
            src={project.visuals[0]} 
            alt={`${project.title} - Overview`} 
            className={`object-contain ${project.id === 'pet-image-classifier' ? 'h-[400px] w-auto rounded-xl shadow-2xl' : 'w-full h-full p-4'}`}
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
            </section>
          )}

          {/* Meta Section */}
          <div className="mt-16 bg-muted/30 border border-primary/10 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-sm">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="mb-10 border-b border-border/60 pb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-3">Project Takeaways</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  A reflection on the core architectural choices made during development, the trade-offs considered, and the roadmap for future enhancements.
                </p>
              </div>

              <div className="flex flex-col gap-12">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold">
                      1
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">
                      Design Decisions & Trade-offs
                    </h3>
                  </div>
                  <ul className="space-y-4">
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
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted-foreground/10 text-muted-foreground font-mono text-sm font-bold">
                      2
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">
                      Future Considerations
                    </h3>
                  </div>
                  <ul className="space-y-4">
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
          </div>
        </div>

        {/* Sidebar (Right) */}
        <aside className="w-full sm:w-64 md:w-72 lg:w-80 shrink-0 sm:sticky sm:top-24 space-y-8 bg-muted/20 border rounded-xl p-6 shadow-sm self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <Server className="h-4 w-4" /> Project Links
            </h3>
            <div className="flex flex-col gap-3">
              {project.links.primary && (
                <Button asChild className="w-full font-mono font-medium shadow-sm">
                  {project.links.primary.url.startsWith('http') ? (
                    <a href={project.links.primary.url} target="_blank" rel="noreferrer">
                      {project.links.primary.url.includes("github.com") ? <Github className="mr-2 h-4 w-4" /> : <Globe className="mr-2 h-4 w-4" />} {project.links.primary.label}
                    </a>
                  ) : (
                    <Link href={project.links.primary.url}>
                      <AppWindow className="mr-2 h-4 w-4" /> {project.links.primary.label}
                    </Link>
                  )}
                </Button>
              )}
              {project.links.secondary && project.links.secondary.map((link, idx) => (
                <Button key={idx} asChild variant="outline" className="w-full font-mono font-medium border-border/60 hover:bg-muted/50">
                  {link.url.startsWith('http') ? (
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.url.includes("github.com") ? <Github className="mr-2 h-4 w-4" /> : <Globe className="mr-2 h-4 w-4" />} {link.label}
                    </a>
                  ) : (
                    <Link href={link.url}>
                      <AppWindow className="mr-2 h-4 w-4" /> {link.label}
                    </Link>
                  )}
                </Button>
              ))}
              {!project.links.primary && (!project.links.secondary || project.links.secondary.length === 0) && (
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

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-20 pt-10 border-t">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
