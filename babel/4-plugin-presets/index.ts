import { PluginItem, transform } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";

const BabelPluginLog = declare((api, options, dirname) => {
  console.log(Object.keys(api), options, dirname);

  return {
    name: "remove-console",
    pre(state) {},
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
    post(state) {},
  };
});

type Params = Parameters<ReturnType<typeof declare>>;

const BabelPresetsLog: (...args: Params) => { plugins: PluginItem[] } = (
  api,
  options,
  dirname
) => ({
  plugins: [[BabelPluginLog, options?.logOptions]],
});

const jsCodeString = "const a = 1;console.log(1)";

const result = transform(jsCodeString, {
  presets: [[BabelPresetsLog, { logOptions: { option1: true } }]],
  // plugins: [[BabelPluginLog, { option1: true }]],
});

console.log(result?.code);
