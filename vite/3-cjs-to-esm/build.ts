import path from "path";
import { defineConfig, build } from "vite";
import { getDirname } from "../utils/shims.mjs";
import { InputOptions, OutputOptions, rollup } from "rollup";
import rollupPluginCommonjs from "@rollup/plugin-commonjs";

const __dirname = getDirname(import.meta.url);

const viteConfig = defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      input: path.join(__dirname, "./add-cjs.js"),
      output: {
        format: "esm",
        dir: path.join(__dirname, "./dist"),
        entryFileNames: "add-esm.js",
      },
    },
  },
});

const rollupInputConfig: InputOptions = {
  input: path.join(__dirname, "./add-cjs.js"),
  plugins: [rollupPluginCommonjs()],
};

const rollupOutputConfig: OutputOptions = {
  format: "esm",
  dir: path.join(__dirname, "./dist"),
  entryFileNames: "add-esm-rollup.js",
};

async function run() {
  await build(viteConfig);

  const bundle = await rollup(rollupInputConfig);

  bundle.write(rollupOutputConfig);

  bundle.close();

  await import("./esm-import-esm.mjs");
}

run();
