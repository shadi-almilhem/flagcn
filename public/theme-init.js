try {
  const storedTheme = window.localStorage.getItem("flagcn-theme")
  const theme = storedTheme === "light" ? "light" : "dark"
  const root = document.documentElement

  root.classList.toggle("dark", theme === "dark")
  root.dataset.theme = theme
  root.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    theme === "dark" ? "#181916" : "#ffffff",
  )
} catch {
  // Dark remains the safe default when storage is unavailable.
}
