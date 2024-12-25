import { Plugin } from "vite";

export function vitePluginLogServerHook(): Plugin {
  return {
    name: "vite-plugin-log-server-hook",

    // ! vite独有

    config(config) {
      // 解析 Vite 配置前调用
      console.log("config.plugins", config.plugins);
    },
    configResolved(configResolved) {
      // 解析 Vite 配置后调用
      console.log(
        "configResolved.plugins",
        configResolved.plugins.map((item) => item.name)
      );
    },
    configureServer(configureServer) {
      // 配置开发服务器
      console.log(
        "configureServer.config.plugins",
        configureServer.config.plugins.map((item) => item.name)
      );
    },
    configurePreviewServer() {
      // 配置预览服务器
      console.log("configurePreviewServer");
    },
    transformIndexHtml(html) {
      // 转换 index.html
      console.log("transformIndexHtml");
      return html + "<!-- 我是注释 -->";
    },
    handleHotUpdate(context) {
      // 自定义 HMR 更新处理
      console.log("handleHotUpdate", context.file);
    },

    // ! 开发阶段仅调用兼容的钩子

    // options() {
    //   // 解析rollup构建配置
    //   console.log("options");
    // },
    // buildStart() {
    //   // 构建开始
    //   console.log("buildStart");
    // },
    // resolveId() {
    //   // 解析模块依赖字符串
    //   console.log("resolveId");
    // },
    // load() {
    //   // 加载模块
    //   console.log("load");
    // },
    // transform() {
    //   // 转换模块
    //   console.log("transform");
    // },
    // buildEnd() {
    //   // 构建结束
    //   console.log("buildEnd");

    //   console.log("=== 构建结束 ===");
    // },
    // closeBundle() {
    //   // ? 这个属于输出钩子，但是vite在开发时也调用

    //   // 关闭打包器
    //   console.log("closeBundle");

    //   console.log("=== 输出结束 ===");
    // },
  };
}
