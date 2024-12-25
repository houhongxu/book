import { Plugin } from "rollup";

export function rollupPluginMainHook(): Plugin {
  const virtualModuleId = "virtual:my-module";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "rollup-plugin-main-hook",
    options(options) {
      console.log("我的配置", options);
    },
    buildStart() {
      console.log("===开始构建===");
    },
    resolveId(id) {
      const cdnModules = ["dayjs"];

      if (cdnModules.includes(id)) {
        return `https://esm.sh/${id}`;
      }

      return null;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const msg = "from virtual module"`;
      }
    },
    transform(code, id) {
      if (id.endsWith(".tsx")) {
        // 在代码开头添加注释
        const newCode = `// 我是注释\n${code}`;

        return {
          code: newCode,
        };
      }

      return null; // 不处理其他类型的文件
    },
    buildEnd() {
      console.log("===结束构建===");
    },
    closeBundle() {
      console.log("===关闭打包器===");
    },
  };
}
