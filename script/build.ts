import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, copyFile, mkdir, writeFile } from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";
import { getIndexableRoutes, getPrerenderRoutes } from "../client/src/data/routes";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();
  
  // Create 404.html as a copy of index.html for SPA routing fallback on static hosting
  await copyFile("dist/public/index.html", "dist/public/404.html");

  console.log("prerendering public routes...");
  await viteBuild({
    build: {
      ssr: path.resolve("client/src/entry-server.tsx"),
      outDir: path.resolve("dist/server"),
      emptyOutDir: false,
    },
  });

  const rendererPath = path.resolve("dist/server/entry-server.js");
  const { renderRoute } = await import(pathToFileURL(rendererPath).href);
  const template = await readFile("dist/public/index.html", "utf-8");

  const createDocument = (route: string) => {
    const { appHtml, head } = renderRoute(route);
    const structuredData = appHtml.match(/<script data-page-metadata="structured-data"[^>]*>[\s\S]*?<\/script>/);
    const body = appHtml.replace(/<script data-page-metadata="structured-data"[^>]*>[\s\S]*?<\/script>/, "");

    return template
      .replace("</head>", `${head}${structuredData?.[0] ?? ""}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  };

  for (const route of getPrerenderRoutes()) {
    const document = createDocument(route);
    const output = route === "/" ? "dist/public/index.html" : `dist/public${route}.html`;
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, document);
  }

  const notFoundDocument = createDocument("/__not-found__");
  await writeFile("dist/public/404.html", notFoundDocument);

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...getIndexableRoutes().map((route) => `  <url><loc>https://ruipushi.com${route}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
  await writeFile("dist/public/sitemap.xml", sitemap);
  await rm("dist/server", { recursive: true, force: true });

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
