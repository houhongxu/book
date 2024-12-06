import { build } from "vite";
import { vitePluginLogBuildHook } from "./vite-plugin-log-build-hook";
import path from "path";
import { getDirname } from "../utils/shims.mjs";

export async function viteBuild() {
  await build({
    build: {
      outDir: path.join(getDirname(import.meta.url), "./dist"),
      minify: false,
      rollupOptions: {
        external: ["react", "react-dom"],
      },
    },
    plugins: [vitePluginLogBuildHook()],
  });
}
