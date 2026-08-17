import assert from "node:assert/strict"

import worker from "../public/_worker.js"

const CONTENT_SIGNAL = "ai-train=yes, search=yes, ai-input=yes"
const DISCOVERY_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json;version=3.1"',
  '</docs>; rel="service-doc"; type="text/html"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
].join(", ")

const assetBodies = new Map([
  ["/", "<!doctype html><title>Flagcn</title><main>Browser page</main>"],
  ["/_agent/home.md", "# Flagcn\n\nAgent-ready project summary."],
  ["/r/ae.json", JSON.stringify({ name: "ae", type: "registry:component" })],
  ["/.well-known/api-catalog", JSON.stringify({ linkset: [] })],
  ["/openapi.json", JSON.stringify({ openapi: "3.1.0" })],
  ["/health.json", JSON.stringify({ status: "ok" })],
])

const env = {
  ASSETS: {
    async fetch(input) {
      const url = new URL(input instanceof Request ? input.url : input.toString())
      const body = assetBodies.get(url.pathname)

      if (body === undefined) {
        return new Response("Not found", {
          status: 404,
          headers: { "Content-Type": "text/html" },
        })
      }

      return new Response(body, {
        headers: {
          "Content-Type": url.pathname.endsWith(".json")
            ? "application/json"
            : "text/html",
        },
      })
    },
  },
}

const markdownResponse = await worker.fetch(
  new Request("https://flagcn.dev/", {
    headers: { Accept: "text/markdown, text/html;q=0.8" },
  }),
  env
)

assert.equal(markdownResponse.status, 200)
assert.match(markdownResponse.headers.get("Content-Type"), /^text\/markdown/)
assert.equal(markdownResponse.headers.get("Content-Signal"), CONTENT_SIGNAL)
assert.match(markdownResponse.headers.get("Vary"), /Accept/)
assert.match(markdownResponse.headers.get("Link"), /rel="api-catalog"/)
assert.ok(Number(markdownResponse.headers.get("x-markdown-tokens")) > 0)
assert.match(await markdownResponse.text(), /^# Flagcn/)

const browserResponse = await worker.fetch(
  new Request("https://flagcn.dev/", {
    headers: { Accept: "text/html" },
  }),
  env
)

assert.match(browserResponse.headers.get("Content-Type"), /^text\/html/)
assert.equal(browserResponse.headers.get("Link"), DISCOVERY_LINKS)
assert.match(await browserResponse.text(), /Browser page/)

const rejectedMarkdownResponse = await worker.fetch(
  new Request("https://flagcn.dev/", {
    headers: { Accept: "text/markdown;q=0, text/html" },
  }),
  env
)

assert.match(rejectedMarkdownResponse.headers.get("Content-Type"), /^text\/html/)

const catalogResponse = await worker.fetch(
  new Request("https://flagcn.dev/.well-known/api-catalog"),
  env
)

assert.equal(
  catalogResponse.headers.get("Content-Type"),
  "application/linkset+json"
)
assert.equal(catalogResponse.headers.get("Access-Control-Allow-Origin"), "*")

const missingItemResponse = await worker.fetch(
  new Request("https://flagcn.dev/r/not-real.json"),
  env
)

assert.equal(missingItemResponse.status, 404)
assert.match(missingItemResponse.headers.get("Content-Type"), /^application\/json/)
assert.deepEqual(await missingItemResponse.json(), {
  error: "Registry item not found",
  name: "not-real",
})

const optionsResponse = await worker.fetch(
  new Request("https://flagcn.dev/r/ae.json", { method: "OPTIONS" }),
  env
)

assert.equal(optionsResponse.status, 204)
assert.equal(
  optionsResponse.headers.get("Access-Control-Allow-Methods"),
  "GET, HEAD, OPTIONS"
)

console.log("Agent discovery and content negotiation checks passed.")
