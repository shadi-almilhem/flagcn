const SITE_ORIGIN = "https://flagcn.dev"
const CONTENT_SIGNAL = "ai-train=yes, search=yes, ai-input=yes"
const DISCOVERY_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json;version=3.1"',
  '</docs>; rel="service-doc"; type="text/html"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
].join(", ")

const MARKDOWN_ROUTES = new Map([
  ["/", "/_agent/home.md"],
  ["/index.html", "/_agent/home.md"],
  ["/flags", "/_agent/flags.md"],
  ["/flags.html", "/_agent/flags.md"],
  ["/docs", "/_agent/docs.md"],
  ["/docs.html", "/_agent/docs.md"],
])

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const markdownAsset = getMarkdownAsset(url.pathname)

    if (isRegistryPath(url.pathname) && request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: registryCorsHeaders(),
      })
    }

    if (
      markdownAsset &&
      (request.method === "GET" || request.method === "HEAD") &&
      acceptsMarkdown(request.headers.get("Accept"))
    ) {
      const markdownUrl = new URL(markdownAsset, url)
      const markdownResponse = await env.ASSETS.fetch(markdownUrl)

      if (markdownResponse.ok) {
        const markdown = await markdownResponse.text()
        const headers = new Headers(markdownResponse.headers)

        headers.set("Content-Type", "text/markdown; charset=utf-8")
        headers.set("Content-Signal", CONTENT_SIGNAL)
        headers.set("Vary", appendVary(headers.get("Vary"), "Accept"))
        headers.set("x-markdown-tokens", estimateTokens(markdown).toString())
        headers.set("Link", DISCOVERY_LINKS)
        headers.delete("Content-Length")

        return new Response(request.method === "HEAD" ? null : markdown, {
          status: markdownResponse.status,
          headers,
        })
      }
    }

    const response = await env.ASSETS.fetch(request)

    if (isRegistryPath(url.pathname) && response.status === 404) {
      const name = url.pathname.slice(3, -5)
      return Response.json(
        { error: "Registry item not found", name },
        { status: 404, headers: registryCorsHeaders() }
      )
    }

    return withDiscoveryHeaders(response, url.pathname)
  },
}

function getMarkdownAsset(pathname) {
  if (pathname.startsWith("/docs/")) return "/_agent/docs.md"
  return MARKDOWN_ROUTES.get(pathname)
}

function acceptsMarkdown(accept) {
  if (!accept) return false

  return accept.split(",").some((entry) => {
    const [mediaType, ...parameters] = entry.trim().split(";")
    if (mediaType.toLowerCase() !== "text/markdown") return false

    const quality = parameters
      .map((parameter) => parameter.trim().toLowerCase())
      .find((parameter) => parameter.startsWith("q="))

    return quality ? Number.parseFloat(quality.slice(2)) > 0 : true
  })
}

function withDiscoveryHeaders(response, pathname) {
  const headers = new Headers(response.headers)
  headers.set("Content-Signal", CONTENT_SIGNAL)

  if (getMarkdownAsset(pathname)) {
    headers.set("Vary", appendVary(headers.get("Vary"), "Accept"))
  }

  if (pathname === "/" || pathname === "/index.html") {
    headers.set("Link", DISCOVERY_LINKS)
  }

  if (pathname === "/.well-known/api-catalog") {
    headers.set("Content-Type", "application/linkset+json")
    headers.set("Access-Control-Allow-Origin", "*")
  }

  if (pathname === "/openapi.json") {
    headers.set(
      "Content-Type",
      "application/vnd.oai.openapi+json;version=3.1"
    )
    headers.set("Access-Control-Allow-Origin", "*")
  }

  if (pathname === "/health.json") {
    headers.set("Content-Type", "application/json; charset=utf-8")
    headers.set("Access-Control-Allow-Origin", "*")
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function appendVary(current, value) {
  const values = new Set(
    (current ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  )
  values.add(value)
  return [...values].join(", ")
}

function estimateTokens(markdown) {
  return Math.max(1, Math.ceil(markdown.length / 4))
}

function isRegistryPath(pathname) {
  return pathname.startsWith("/r/") && pathname.endsWith(".json")
}

function registryCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type",
    "Content-Signal": CONTENT_SIGNAL,
    "Content-Type": "application/json; charset=utf-8",
  }
}
