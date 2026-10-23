export type ProjectRole = "Data Analyst" | "Data Engineer" | "Machine Learning" | "Web Design";

export type ProjectActionLink = {
  label: string;
  url: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ProjectContentBlockBase = {
  id: string;
  title?: string;
};

export type ProseBlock = ProjectContentBlockBase & {
  type: "prose";
  paragraphs: string[];
};

export type ListBlock = ProjectContentBlockBase & {
  type: "list";
  items: string[];
};

export type ImageBlock = ProjectContentBlockBase & {
  type: "image";
  image: ProjectImage;
  display?: "framed" | "contained";
};

export type GalleryBlock = ProjectContentBlockBase & {
  type: "gallery";
  images: ProjectImage[];
};

export type MetricsBlock = ProjectContentBlockBase & {
  type: "metrics";
  description?: string;
  items: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
};

export type CalloutBlock = ProjectContentBlockBase & {
  type: "callout";
  variant: "insight" | "note" | "result";
  content: ProjectContentBlock[];
};

export type TableBlock = ProjectContentBlockBase & {
  type: "table";
  caption?: string;
  columns: string[];
  rows: string[][];
};

export type TwoColumnBlock = ProjectContentBlockBase & {
  type: "twoColumn";
  columns: [
    { content: ProjectContentBlock[] },
    { content: ProjectContentBlock[] },
  ];
};

export type ProjectContentBlock =
  | ProseBlock
  | ListBlock
  | ImageBlock
  | GalleryBlock
  | MetricsBlock
  | CalloutBlock
  | TableBlock
  | TwoColumnBlock;

export type Project = {
  id: string;
  title: string;
  short_summary: string;
  role: ProjectRole;
  tags: string[];
  tech_stack: string[];
  dataset_source?: string;
  links: {
    primary?: ProjectActionLink;
    secondary?: ProjectActionLink[];
  };
  featured?: boolean;
  presentation?: {
    cardImage?: ProjectImage;
    hero?: {
      image: ProjectImage;
      layout?: "standard" | "portrait";
    };
  };
  content: ProjectContentBlock[];
};
