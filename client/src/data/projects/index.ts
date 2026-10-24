import { anuExecutiveDashboard } from "./anuExecutiveDashboard";
import { chongqingStreetNoodle } from "./chongqingStreetNoodle";
import { companyEnrichmentPipeline } from "./companyEnrichmentPipeline";
import { petImageClassifier } from "./petImageClassifier";
import type { Project } from "./types";

export type { CalloutBlock, GalleryBlock, ImageBlock, ListBlock, MetricsBlock, Project, ProjectActionLink, ProjectContentBlock, ProjectImage, ProjectRole, ProseBlock, TableBlock, TwoColumnBlock } from "./types";

export const PROJECTS: Project[] = [anuExecutiveDashboard, petImageClassifier, companyEnrichmentPipeline, chongqingStreetNoodle];
