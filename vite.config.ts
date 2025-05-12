import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import pwa from "./pwa.config";

export default defineConfig({
  plugins: [react(), pwa],
});
