import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const outputDirectory = path.resolve("dist")
const appShell = path.join(outputDirectory, "index.html")
const routeSeo = JSON.parse(await readFile(path.resolve("src/config/seo-routes.json"), "utf8"))
const appHtml = await readFile(appShell, "utf8")
const siteOrigin = "https://flagcn.dev"

await Promise.all(Object.entries(routeSeo).filter(([route]) => route !== "/").map(async ([route, seo]) => {
  const routeShell = path.join(outputDirectory, `${route.slice(1)}.html`)
  await mkdir(path.dirname(routeShell), { recursive: true })
  await writeFile(routeShell, withRouteMetadata(appHtml, route, seo), "utf8")
}))

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...Object.keys(routeSeo).map((route) => `  <url><loc>${new URL(route, siteOrigin).toString()}</loc></url>`),
  '</urlset>',
  '',
].join("\n")

await Promise.all([
  writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap, "utf8"),
  writeFile(path.resolve("public/sitemap.xml"), sitemap, "utf8"),
])

console.log(`Generated ${Object.keys(routeSeo).length - 1} static route shells and sitemap.xml.`)

function withRouteMetadata(html, route, seo) {
  const canonicalUrl = new URL(route, siteOrigin).toString()

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${escapeHtml(seo.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${canonicalUrl}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(seo.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${escapeHtml(seo.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${canonicalUrl}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(seo.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${escapeHtml(seo.description)}$2`)
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}
