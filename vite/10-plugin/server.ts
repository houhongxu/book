import { createServer } from "vite";
import { rollupPluginMainHook } from "./rollup-plugin-main-hook";
import { vitePluginLogServerHook } from "./vite-plugin-log-server-hook";
import vitePluginReact from "@vitejs/plugin-react";

export async function viteDev() {
  const server = await createServer({
    build: {
      rollupOptions: {
        external: ["options示例"],
      },
    },
    plugins: [
      // rollupPluginMainHook(),

      vitePluginLogServerHook(),
      vitePluginReact(),
    ],
  });

  await server.listen(3535);

  server.printUrls();

  // server.close();
}
