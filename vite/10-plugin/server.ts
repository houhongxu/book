import { createServer } from "vite";
import { vitePluginLogServerHook } from "./vite-plugin-log-server-hook";

export async function viteDev() {
  const server = await createServer({
    plugins: [vitePluginLogServerHook()],
  });

  await server.listen(3535);

  server.printUrls();

  server.close();
}
