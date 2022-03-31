// @refresh reload
import { Links, Routes, Scripts } from "solid-start/root";
import { Suspense } from "solid-js";
import { ErrorBoundary } from "solid-start/error-boundary";
import { isServer } from "solid-js/web";
import { Navbar } from "./components/Navbar";
import "./root.css";
import { Layout } from "./components/Layout";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <title>Solid - Hacker News</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Hacker News Clone built with Solid" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Links />
      </head>
      <body class="bg-blue-200">
        <Navbar />
        <ErrorBoundary>
          <Layout>
            <Suspense fallback={<div class="news-list-nav">Loading...</div>}>
              <Routes />
            </Suspense>
          </Layout>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}

if (import.meta.env.PROD && !isServer && "serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`/sw.js`);
  });
}
