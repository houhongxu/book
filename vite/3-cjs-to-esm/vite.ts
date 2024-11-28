import path from "path";
import { defineConfig, build } from "vite";
import { getDirname } from "../utils/shims.mjs";

const __dirname = getDirname(import.meta.url);

const config = defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      // 不支持cts
      input: path.join(__dirname, "./add-cjs.ts"),
      output: {
        format: "esm",
        dir: path.join(__dirname, "./dist"),
        entryFileNames: "add-cjs.js",
      },
    },
  },
});

async function run() {
  await build(config);

  await import("./esm-import-cjs.mjs");
}

run();
