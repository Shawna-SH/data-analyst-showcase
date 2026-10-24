import type { ProjectContentBlock } from "@/data/projects";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { resolveProjectImage } from "./projectImages";

type ContentBlockRendererProps = {
  blocks: ProjectContentBlock[];
  nested?: boolean;
};

function BlockHeading({ title, nested = false }: { title?: string; nested?: boolean }) {
  if (!title) return null;

  if (nested) {
    return <h3 className="text-base font-bold tracking-tight mb-3">{title}</h3>;
  }

  return <h2 className="text-lg md:text-xl font-bold tracking-tight mb-4 border-b pb-2">{title}</h2>;
}

function ProseBlock({ block, nested }: { block: Extract<ProjectContentBlock, { type: "prose" }>; nested: boolean }) {
  return (
    <section>
      <BlockHeading title={block.title} nested={nested} />
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {block.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </section>
  );
}

function ListBlock({ block, nested }: { block: Extract<ProjectContentBlock, { type: "list" }>; nested: boolean }) {
  return (
    <section>
      <BlockHeading title={block.title} nested={nested} />
      <ul className="space-y-3">
        {block.items.map((item, index) => (
          <li key={index} className="flex gap-3 text-muted-foreground">
            <span className="text-primary font-bold" aria-hidden="true">•</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ImageBlock({ block, nested }: { block: Extract<ProjectContentBlock, { type: "image" }>; nested: boolean }) {
  const image = resolveProjectImage(block.image);

  return (
    <section>
      <BlockHeading title={block.title} nested={nested} />
      <figure className="rounded-xl overflow-hidden border shadow-sm bg-muted/20">
        <img src={image.src} alt={image.alt} className={block.display === "contained" ? "w-full h-auto object-contain p-3" : "w-full h-auto object-cover"} />
        {image.caption && <figcaption className="px-4 py-3 text-sm text-muted-foreground border-t">{image.caption}</figcaption>}
      </figure>
    </section>
  );
}

function GalleryBlock({ block, nested }: { block: Extract<ProjectContentBlock, { type: "gallery" }>; nested: boolean }) {
  return (
    <section>
      <BlockHeading title={block.title} nested={nested} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {block.images.map((image) => {
          const resolvedImage = resolveProjectImage(image);

          return <figure key={image.src} className="rounded-xl overflow-hidden border shadow-sm bg-muted/20">
            <img src={resolvedImage.src} alt={resolvedImage.alt} className="w-full h-auto object-contain p-2" />
            {resolvedImage.caption && <figcaption className="px-4 py-3 text-sm text-muted-foreground border-t">{resolvedImage.caption}</figcaption>}
          </figure>
        })}
      </div>
    </section>
  );
}

function MetricsBlock({ block, nested }: { block: Extract<ProjectContentBlock, { type: "metrics" }>; nested: boolean }) {
  return (
    <section>
      <BlockHeading title={block.title} nested={nested} />
      {block.description && <p className="mb-5 text-muted-foreground leading-relaxed">{block.description}</p>}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {block.items.map((item) => (
          <div key={item.label} className="rounded-xl border bg-muted/20 p-5">
            <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
            <dd className="mt-2 text-2xl font-bold tracking-tight text-primary">{item.value}</dd>
            {item.description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
          </div>
        ))}
      </dl>
    </section>
  );
}

function CalloutBlock({ block, nested }: { block: Extract<ProjectContentBlock, { type: "callout" }>; nested: boolean }) {
  const variantClassName = {
    insight: "border-primary/20 bg-primary/5",
    note: "border-border bg-muted/30",
    result: "border-primary/20 bg-primary/10",
  }[block.variant];

  return (
    <section className={`rounded-2xl border p-6 md:p-8 shadow-sm ${variantClassName}`}>
      <BlockHeading title={block.title} nested={nested} />
      <ContentBlockRenderer blocks={block.content} nested />
    </section>
  );
}

function TableBlock({ block, nested }: { block: Extract<ProjectContentBlock, { type: "table" }>; nested: boolean }) {
  return (
    <section>
      <BlockHeading title={block.title} nested={nested} />
      <Table>
        {block.caption && <TableCaption>{block.caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {block.columns.map((column) => <TableHead key={column}>{column}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {block.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

function TwoColumnBlock({ block }: { block: Extract<ProjectContentBlock, { type: "twoColumn" }> }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {block.columns.map((column, index) => <ContentBlockRenderer key={index} blocks={column.content} nested />)}
    </section>
  );
}

export function ContentBlockRenderer({ blocks, nested = false }: ContentBlockRendererProps) {
  return (
    <div className={nested ? "space-y-7" : "space-y-12"}>
      {blocks.map((block) => {
        switch (block.type) {
          case "prose": return <ProseBlock key={block.id} block={block} nested={nested} />;
          case "list": return <ListBlock key={block.id} block={block} nested={nested} />;
          case "image": return <ImageBlock key={block.id} block={block} nested={nested} />;
          case "gallery": return <GalleryBlock key={block.id} block={block} nested={nested} />;
          case "metrics": return <MetricsBlock key={block.id} block={block} nested={nested} />;
          case "callout": return <CalloutBlock key={block.id} block={block} nested={nested} />;
          case "table": return <TableBlock key={block.id} block={block} nested={nested} />;
          case "twoColumn": return <TwoColumnBlock key={block.id} block={block} />;
        }
      })}
    </div>
  );
}
