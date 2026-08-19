export async function downloadRemoteFile(sourceUrl: string, fileName: string) {
  const response = await fetch(sourceUrl, { mode: "cors" })
  if (!response.ok) throw new Error(`Could not download the file (${response.status}).`)

  const objectUrl = URL.createObjectURL(await response.blob())
  const anchor = document.createElement("a")
  anchor.href = objectUrl
  anchor.download = fileName
  anchor.hidden = true
  document.body.append(anchor)

  try {
    anchor.click()
  } finally {
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0)
  }
}
