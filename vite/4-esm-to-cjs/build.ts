import path from "path";
import { defineConfig, build } from "vite";
import { getDirname } from "../utils/shims.mjs";
import { InputOptions, OutputOptions, rollup } from "rollup";

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

async function run() {
  await build(viteConfig);

  const bundle = await rollup(rollupInputConfig);

  bundle.write(rollupOutputConfig);

  bundle.close();

  await import("./esm-import-cjs.mjs");
}

run();
