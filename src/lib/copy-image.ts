export type CopyImageRatio = "4x3" | "1x1" | "original"
export type CopyImageFormat = "svg" | "png" | "webp" | "jpg"

interface CopyImageOptions {
  ratio: CopyImageRatio
  format: CopyImageFormat
  width?: number
}

const mimeTypes: Record<CopyImageFormat, string> = {
  svg: "image/svg+xml",
  png: "image/png",
  webp: "image/webp",
  jpg: "image/jpeg",
}

export async function copyImageToClipboard(
  sourceUrl: string,
  { ratio, format, width = 320 }: CopyImageOptions,
) {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    throw new Error("Image clipboard access is not supported in this browser.")
  }

  const source = fetchImage(sourceUrl)
  const sourceMimeType = mimeTypes[format]
  const supportsSourceType = typeof ClipboardItem.supports === "function"
    ? ClipboardItem.supports(sourceMimeType)
    : sourceMimeType === "image/png"

  if (supportsSourceType) {
    await navigator.clipboard.write([new ClipboardItem({ [sourceMimeType]: source })])
    return
  }

  const png = renderClipboardPng(source, ratio, width)
  await navigator.clipboard.write([new ClipboardItem({ "image/png": png })])
}

async function fetchImage(sourceUrl: string) {
  const response = await fetch(sourceUrl, { mode: "cors" })
  if (!response.ok) throw new Error(`Could not load image (${response.status}).`)
  return response.blob()
}

async function renderClipboardPng(sourcePromise: Promise<Blob>, ratio: CopyImageRatio, width: number) {
  const source = await sourcePromise
  const objectUrl = URL.createObjectURL(source)

  try {
    const image = await loadImage(objectUrl)
    const naturalWidth = image.naturalWidth || width
    const naturalHeight = image.naturalHeight || Math.round(width * 0.75)
    const canvasWidth = width
    const canvasHeight = ratio === "1x1"
      ? width
      : ratio === "4x3"
        ? Math.round(width * 0.75)
        : Math.max(1, Math.round(width * (naturalHeight / naturalWidth)))
    const scale = Math.min(canvasWidth / naturalWidth, canvasHeight / naturalHeight)
    const drawWidth = naturalWidth * scale
    const drawHeight = naturalHeight * scale
    const canvas = document.createElement("canvas")
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const context = canvas.getContext("2d")
    if (!context) throw new Error("Could not prepare the image clipboard.")
    context.drawImage(
      image,
      (canvasWidth - drawWidth) / 2,
      (canvasHeight - drawHeight) / 2,
      drawWidth,
      drawHeight,
    )

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Could not encode the clipboard image."))
      }, "image/png")
    })
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Could not decode the image."))
    image.src = src
  })
}
