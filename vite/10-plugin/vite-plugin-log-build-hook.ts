import { Plugin } from "vite";

export function vitePluginLogBuildHook(): Plugin {
  return {
    name: "vite-plugin-log-hook",

    // ! vite独有

    config() {
      // 解析 Vite 配置前调用
      console.log("config");
    },
    configResolved() {
      // 解析 Vite 配置后调用
      console.log("configResolved");
    },
    configureServer() {
      // 配置开发服务器
      console.log("configureServer");
    },
    configurePreviewServer() {
      // 配置预览服务器
      console.log("configurePreviewServer");
    },
    transformIndexHtml() {
      // 转换 index.html
      console.log("transformIndexHtml");
    },
    handleHotUpdate() {
      // 自定义 HMR 更新处理
      console.log("handleHotUpdate");
    },

    // ! 构建阶段使用rollup支持所有钩子

    // === 构建钩子(除了两个watch钩子，一个log钩子，一个cache钩子) ===

    options() {
      // 解析rollup构建配置
      console.log("options");
    },
    buildStart() {
      // 构建开始
      console.log("buildStart");
    },
    resolveId() {
      // 解析模块依赖字符串
      console.log("resolveId");
    },
    load() {
      // 加载模块
      console.log("load");
    },
    transform() {
      // 转换模块
      console.log("transform");
    },
    moduleParsed() {
      // 模块完全解析
      console.log("moduleParsed");
    },
    renderDynamicImport() {
      // 解析动态导入
      console.log("renderDynamicImport");
    },
    buildEnd() {
      // 构建结束
      console.log("buildEnd");

      console.log("=== 构建结束 ===");
    },

    // === 输出钩子 ===

    outputOptions() {
      // 解析rollup输出配置
      console.log("outputOptions");
    },
    renderStart() {
      // 输出开始
      console.log("renderStart");
    },
    // renderDynamicImport vite尚未支持
    resolveImportMeta() {
      // 解析import.meta
      console.log("resolveImportMeta");
    },
    resolveFileUrl() {
      // 解析import.meta.url
      console.log("resolveFileUrl");
    },

    // 并发，Promise.all
    banner() {
      //向chunk插入内容
      console.log("banner");
      return "";
    },
    footer() {
      //向chunk插入内容
      console.log("footer");
      return "";
    },
    intro() {
      //向chunk插入内容
      console.log("intro");
      return "";
    },
    outro() {
      //向chunk插入内容
      console.log("outro");
      return "";
    },

    augmentChunkHash() {
      // chunk哈希值
      console.log("augmentChunkHash");
    },
    renderChunk() {
      // 输出chunk
      console.log("renderChunk");
    },
    generateBundle() {
      // 打包，写出文件前
      console.log("generateBundle");
    },
    writeBundle() {
      // 写出文件后
      console.log("writeBundle");
    },
    renderError() {
      // 错误处理
      console.log("renderError");
    },
    closeBundle() {
      // ? 这个属于输出钩子，但是vite在开发时也调用

      // 关闭打包器
      console.log("closeBundle");

      console.log("=== 输出结束 ===");
    },
  };
}
