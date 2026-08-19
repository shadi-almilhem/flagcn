export async function copyTextToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return
    } catch {
      // Fall through to the selection-based copy path for restricted browsers.
    }
  }

  const textarea = document.createElement("textarea")
  textarea.value = value
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.append(textarea)
  textarea.select()

  try {
    if (typeof document.execCommand !== "function" || !document.execCommand("copy")) {
      throw new Error("The browser rejected the copy command.")
    }
  } finally {
    textarea.remove()
  }
}
