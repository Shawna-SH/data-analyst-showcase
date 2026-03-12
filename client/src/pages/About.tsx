import { PORTFOLIO_CONFIG } from "@/data/config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, Linkedin, Download, Terminal, Database, LineChart } from "lucide-react";

export default function About() {
  const { personalInfo, skills } = PORTFOLIO_CONFIG;

  return (
    <div className="container py-12 md:py-24 max-w-4xl min-h-screen">
      <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
        
        {/* Left Column: Bio & Skills */}
        <div className="space-y-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About Me</h1>
            <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
              <p className="mb-4">
                I am a data analyst who enjoys transforming complex and messy datasets 
                into clear insights that support better decisions. I approach data problems 
                with curiosity and structure, focusing on understanding patterns, uncovering 
                meaningful trends, and communicating results in a way that stakeholders can 
                actually use.
              </p>
              
              <p>
                My work often sits at the intersection of analysis and communication. I enjoy 
                exploring data, building analytical workflows, and presenting insights through 
                clear visualisations and dashboards. I believe that good data work is not just 
                about numbers, but about helping people see the story behind the data and act 
                on it with confidence.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" /> Core Capabilities
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map(skill => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">Data Analysis</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.data_analysis.map(skill => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">Data Engineering</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.data_engineering.map(skill => (
                    <Badge key={skill} variant="outline" className="px-3 py-1 text-sm border-primary/20">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">Visualization</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.visualization.map(skill => (
                    <Badge key={skill} variant="outline" className="px-3 py-1 text-sm">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">Machine Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.ml.map(skill => (
                    <Badge key={skill} variant="outline" className="px-3 py-1 text-sm bg-muted/50">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map(skill => (
                    <Badge key={skill} variant="outline" className="px-3 py-1 text-sm">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Contact & Resume */}
        <div className="bg-card border rounded-2xl p-6 md:p-8 sticky top-24 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Let's Connect</h2>
          
          <div className="space-y-4 mb-8">
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-muted-foreground font-mono">{personalInfo.email}</p>
              </div>
            </a>

            <a 
              href={personalInfo.linkedin} 
              target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">LinkedIn</p>
                <p className="text-xs text-muted-foreground font-mono">View professional profile</p>
              </div>
            </a>

            <a 
              href={personalInfo.github} 
              target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">GitHub</p>
                <p className="text-xs text-muted-foreground font-mono">Browse projects and code</p>
              </div>
            </a>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for a formal overview of my experience and education?
            </p>
            <Button asChild className="w-full font-mono">
              <a href={personalInfo.resumeLink}>
                <Download className="mr-2 h-4 w-4" /> Download Resume (PDF)
              </a>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
