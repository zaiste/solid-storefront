import { defineConfig } from "vite";
import solid from "solid-start";
import vercel from "solid-start-vercel";
import netlify from "solid-start-netlify";

export default defineConfig({
  plugins: [solid({ adapter: vercel() })]
});
