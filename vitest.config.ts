import { defineConfig } from "vitest/config";
import viteTsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
