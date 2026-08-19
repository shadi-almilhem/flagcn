import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { App } from "./app"
import { AppErrorBoundary } from "./components/site/app-error-boundary"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AppErrorBoundary>
          <App />
        </AppErrorBoundary>
      </BrowserRouter>
      <Toaster position="bottom-right" closeButton />
    </ThemeProvider>
  </StrictMode>,
)
