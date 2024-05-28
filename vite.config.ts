import { defineConfig } from "vitest/config";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { uglify } from "rollup-plugin-uglify";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "FTL",
      fileName: "index",
    },
    rollupOptions: {
      output: {
        globals: {},
        plugins: [uglify()],
      },
    },
  },
  plugins: [dts()],
  test: {},
});
