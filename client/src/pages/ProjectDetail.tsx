import { useParams, Link } from "wouter";
import { PROJECTS, type Project } from "@/data/config";
import { ArrowLeft, Github, Database, Code2, Server, Globe, AppWindow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageMetadata } from "@/components/PageMetadata";
import { projectRoute } from "@/data/routes";
import { ProjectCard } from "@/components/ProjectCard";
import { ContentBlockRenderer } from "@/components/project-content/ContentBlockRenderer";
import { resolveProjectImage } from "@/components/project-content/projectImages";

function getRelatedProjects(currentProject: Project, allProjects: Project[]) {
  return allProjects
    .filter((project) => project.id !== currentProject.id)
    .map((project) => ({
      project,
      score: project.tags.filter((tag) => currentProject.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ project }) => project);
}

function ProjectLinkButton({ link, primary = false }: { link: { label: string; url: string }; primary?: boolean }) {
  const isExternal = link.url.startsWith("http");
  const icon = link.url.includes("github.com") ? <Github className="mr-2 h-4 w-4" /> : isExternal ? <Globe className="mr-2 h-4 w-4" /> : <AppWindow className="mr-2 h-4 w-4" />;
  const className = "w-full font-mono font-medium";

  return (
    <Button asChild variant={primary ? "default" : "outline"} className={className}>
      {isExternal ? <a href={link.url} target="_blank" rel="noreferrer">{icon} {link.label}</a> : <Link href={link.url}>{icon} {link.label}</Link>}
    </Button>
  );
}

export default function ProjectDetail() {
  const params = useParams();
  const project = PROJECTS.find((item) => item.id === params.id);

  if (!project) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <Button asChild variant="outline">
          <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects</Link>
        </Button>
      </div>
    );
  }

  const hero = project.presentation?.hero;
  const resolvedHero = hero && { ...hero, image: resolveProjectImage(hero.image) };
  const metadataImage = resolvedHero?.image.src ?? (project.presentation?.cardImage && resolveProjectImage(project.presentation.cardImage).src) ?? "/opengraph.jpg";
  const relatedProjects = getRelatedProjects(project, PROJECTS);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.short_summary,
    url: `https://ruipushi.com/projects/${project.id}`,
    author: { "@type": "Person", name: "Ruipu Shi" },
  };

  return (
    <div className="container max-w-6xl py-12 md:py-20">
      <PageMetadata
        title={`${project.title} | Data Engineering & Analytics Project | Ruipu Shi`}
        description={project.short_summary}
        path={projectRoute(project.id)}
        type="article"
        image={metadataImage}
        structuredData={projectSchema}
      />

      <Link href="/projects">
        <span className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 cursor-pointer transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
        </span>
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline" className="font-mono text-primary border-primary/30 bg-primary/5">{project.role}</Badge>
          {project.featured && <Badge variant="default" className="font-mono">Featured</Badge>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{project.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">{project.short_summary}</p>
      </div>

      {resolvedHero && (
        <figure className={`w-full rounded-xl overflow-hidden border mb-12 shadow-sm bg-muted/20 flex justify-center items-center ${resolvedHero.layout === "portrait" ? "py-12" : "aspect-[4/3]"}`}>
          <img src={resolvedHero.image.src} alt={resolvedHero.image.alt} className={resolvedHero.layout === "portrait" ? "h-[400px] w-auto max-w-full object-contain rounded-xl shadow-2xl" : "w-full h-full object-contain p-4"} />
          {resolvedHero.image.caption && <figcaption className="sr-only">{resolvedHero.image.caption}</figcaption>}
        </figure>
      )}

      <div className="flex flex-col sm:flex-row gap-8 lg:gap-16 items-start">
        <div className="flex-1 w-full min-w-0">
          <ContentBlockRenderer blocks={project.content} />
        </div>

        <aside className="w-full sm:w-64 md:w-72 lg:w-80 shrink-0 sm:sticky sm:top-24 space-y-8 bg-muted/20 border rounded-xl p-6 shadow-sm self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-4 text-sm text-muted-foreground"><Server className="h-4 w-4" /> Project Links</h3>
            <div className="flex flex-col gap-3">
              {project.links.primary && <ProjectLinkButton link={project.links.primary} primary />}
              {project.links.secondary?.map((link) => <ProjectLinkButton key={`${link.label}-${link.url}`} link={link} />)}
              {!project.links.primary && !project.links.secondary?.length && <div className="p-3 bg-muted/50 rounded-md border border-dashed border-border/50 text-center"><span className="text-xs text-muted-foreground font-mono">Internal/Proprietary</span></div>}
            </div>
          </div>

          <Separator className="bg-border/40" />

          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3 text-sm text-muted-foreground"><Code2 className="h-4 w-4" /> Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => <Badge key={tech} variant="secondary" className="font-mono text-xs font-normal border-transparent bg-secondary/80 hover:bg-secondary">{tech}</Badge>)}
            </div>
          </div>

          {project.dataset_source && <>
            <Separator className="bg-border/40" />
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-xs md:text-sm text-muted-foreground"><Database className="h-4 w-4" /> Data Source</h3>
              <p className="text-sm leading-relaxed text-foreground/90">{project.dataset_source}</p>
            </div>
          </>}
        </aside>
      </div>

      {relatedProjects.length > 0 && (
        <div className="mt-20 pt-10 border-t">
          <h2 className="text-lg md:text-xl font-bold tracking-tight mb-8">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((relatedProject) => <ProjectCard key={relatedProject.id} project={relatedProject} />)}
          </div>
        </div>
      )}
    </div>
  );
}
