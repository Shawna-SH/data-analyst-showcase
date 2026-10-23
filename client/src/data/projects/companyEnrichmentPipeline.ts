import type { Project } from "./types";

const enrichmentArchitecture = { src: "/assets/images/company-enrichment-architecture.png", alt: "Company Enrichment Pipeline architecture diagram" };

export const companyEnrichmentPipeline: Project = {
  id: "company-enrichment-pipeline",
  title: "Company Enrichment Pipeline",
  short_summary: "Designed a scalable pipeline that transforms noisy web data into structured company records using rule-based validation, selective LLM fallback, and deduplication.",
  role: "Data Engineer",
  tags: ["Data Engineering", "Information Extraction", "Entity Resolution", "Pipeline Design", "LLM Integration"],
  tech_stack: ["Python", "Search APIs", "Web Parsing", "OCR", "Rule-based Systems", "LLM", "Entity Resolution"],
  dataset_source: "Public web data (company websites, search results, external business profiles)",
  links: { primary: { label: "View Code", url: "https://github.com/Shawna-SH/Company-Enrichment-Pipeline-Case-Study" } },
  featured: true,
  presentation: { cardImage: enrichmentArchitecture },
  content: [
    { id: "context", type: "prose", title: "Problem & Context", paragraphs: ["Company data from the open web is noisy, inconsistent, and difficult to trust at scale. Search results often include irrelevant pages, while key attributes such as company name, logo, description, and office locations appear in conflicting formats across sources. A naive LLM-first approach is costly and lacks controllability, making it unsuitable for large-scale enrichment."] },
    { id: "approach", type: "prose", title: "Approach & Architecture", paragraphs: ["Designed a hybrid enrichment pipeline that filters raw search results to likely official company websites, followed by parallel extraction of key attributes (name, logo, description, office, contact, and social profiles). Candidate values are ranked using rule-based scoring and cross-source consistency checks. LLM validation is applied only to low-confidence cases. A final deduplication stage resolves duplicate entities before outputting clean, database-ready records."] },
    { id: "architecture", type: "image", title: "Pipeline Architecture", image: enrichmentArchitecture, display: "contained" },
    { id: "results", type: "metrics", title: "Key Results", description: "Outcomes delivered by the automated enrichment workflow.", items: [
      { label: "Company database expansion", value: "10%", description: "Expanded the company database by 10% through automated enrichment from web sources." },
      { label: "Data completeness", value: "50%", description: "Improved data completeness by 50% by consolidating multi-source signals and resolving missing attributes." },
    ] },
    { id: "additional-results", type: "list", items: ["Reduced reliance on LLM calls through a deterministic-first decision framework, lowering operational cost.", "Delivered deduplicated, database-ready company records for downstream analytics and applications."] },
    { id: "takeaways", type: "callout", title: "Project Takeaways", variant: "insight", content: [
      { id: "design-decisions", type: "list", title: "Design Decisions & Trade-offs", items: ["Adopted a rule-first, LLM-second architecture to balance cost, control, and scalability.", "Designed parallel enrichment modules to improve throughput and system modularity.", "Applied cross-source validation to handle conflicting information from noisy web inputs.", "Introduced a final deduplication stage to resolve duplicate entities before storage."] },
      { id: "future-considerations", type: "list", title: "Future Considerations", items: ["Enhance entity resolution to better handle subsidiaries, rebranding, and multi-location companies.", "Introduce monitoring metrics such as confidence scores, fallback rates, and deduplication quality.", "Expand enrichment coverage to include firmographic attributes such as industry classification and company size."] },
    ] },
  ],
};
