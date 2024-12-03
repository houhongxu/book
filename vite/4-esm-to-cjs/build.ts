import path from "path";
import { defineConfig, build as viteBuild } from "vite";
import { getDirname } from "../utils/shims.mjs";
import { InputOptions, OutputOptions, rollup } from "rollup";
import { build as esbuildBuild, BuildOptions } from "esbuild";

const __dirname = getDirname(import.meta.url);

const viteConfig = defineConfig({
  build: {
    minify: false,
    ssr: true, // ? 为什么要加这个才能打包成功，或许是因为vite仅在ssr场景有cjs
    rollupOptions: {
      // 不支持mts
      input: path.join(__dirname, "./add-esm.js"),
      output: {
        format: "cjs",
        dir: path.join(__dirname, "./dist"),
        entryFileNames: "add-cjs.js",
      },
      // esm构建时，未使用的会shake掉
      treeshake: false,
    },
  },
});

const rollupInputConfig: InputOptions = {
  input: path.join(__dirname, "./add-esm.js"),
};

const rollupOutputConfig: OutputOptions = {
  format: "cjs",
  dir: path.join(__dirname, "./dist"),
  entryFileNames: "add-cjs-rollup.js",
};

const esbuildConfig: BuildOptions = {
  format: "cjs",
  entryPoints: [path.join(__dirname, "./add-esm.js")],
  outfile: path.join(__dirname, "./dist", "add-cjs-esbuild.js"),
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

  await import("./esm-import-cjs.mjs");
}

run();
