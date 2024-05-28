import { defineConfig } from "vitest/config";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "FTL",
      fileName: "index",
    },
    minify: "esbuild",
    rollupOptions: {
      output: {
        globals: {},
      },
    },
  },
  plugins: [dts()],
  test: {},
});
