import { PluginObj, transform } from "@babel/core";

// 参数就是@babel/core的导出
function BabelPluginLog(babel: any): PluginObj {
  console.log(Object.keys(babel));

  return {
    name: "remove-console",
    visitor: {
      CallExpression(path, state) {
        const callee = path.node.callee;

        console.log(state.opts);

        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "console" &&
          callee.property.type === "Identifier" &&
          callee.property.name === "log"
        ) {
          path.remove();
        }
      },
    },
  };
}

const jsCodeString = "const a = 1;console.log(1)";

const result = transform(jsCodeString, {
  plugins: [[BabelPluginLog, { option1: true }]],
});

console.log(result?.code);
