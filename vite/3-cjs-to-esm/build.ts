import path from "path";
import { defineConfig, build as viteBuild } from "vite";
import { getDirname } from "../utils/shims.mjs";
import { InputOptions, OutputOptions, rollup } from "rollup";
import rollupPluginCommonjs from "@rollup/plugin-commonjs";
import { build as esbuildBuild, BuildOptions } from "esbuild";

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

const esbuildConfig: BuildOptions = {
  format: "esm",
  entryPoints: [path.join(__dirname, "./add-cjs.js")],
  outfile: path.join(__dirname, "./dist", "add-esm-esbuild.js"),
};

async function rollupBuild(
  rollupInputConfig: InputOptions,
  rollupOutputConfig: OutputOptions
) {
  const bundle = await rollup(rollupInputConfig);

  bundle.write(rollupOutputConfig);

  bundle.close();
}

async function run() {
  await viteBuild(viteConfig);

  await rollupBuild(rollupInputConfig, rollupOutputConfig);

  await esbuildBuild(esbuildConfig);

  await import("./esm-import-esm.mjs");
}

run();
