// @refresh reload
import { Links, Routes, Scripts } from "solid-start/root";
import { createResource, createSignal, Suspense } from "solid-js";
import { ErrorBoundary } from "solid-start/error-boundary";
import { isServer } from "solid-js/web";
import { Navbar } from "./components/Navbar";
import "./root.css";
import { Layout } from "./components/Layout";
import { client } from "~/lib/api";
import { CreateCheckout } from "./graphql/mutation/CreateCheckout";
import { createLocalStore } from "./lib/util";
import { CheckoutProvider } from "./context/Checkout";

export default function Root() {
  // const [state, setState] = createLocalStore({ token: "" });
  const [token, setToken] = createSignal("");

  const [checkout] = createResource(async () => {
    const { data } = await client.mutation(CreateCheckout, {}).toPromise()
    const token: string = data.checkoutCreate.checkout.token;

    setToken(token)

    return token;
  });


  return (
    <html lang="en">
      <head>
        <title>Solid Storefront</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Solid Storefront - E-Commmerce Solution for Solid.js" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Links />
      </head>
      <body class="bg-blue-200">
        <Navbar />
        <ErrorBoundary>
          <CheckoutProvider token={token}>
            <Layout>
              <Suspense fallback={<div class="news-list-nav">Loading...</div>}>
                <Routes />
              </Suspense>
            </Layout>
          </CheckoutProvider>
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
