import "@testing-library/jest-dom/vitest"

if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = (callback) => window.setTimeout(callback, 0)
}
