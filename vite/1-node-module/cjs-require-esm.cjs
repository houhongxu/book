const { addCjs } = require("./utils/named-add-cjs.cjs");

async function run() {
  // cjs require esm也是可行的，需要使用await import兼容
  const allExport = await import("./utils/add-esm.mjs");
  const defaultEsm = allExport.default;
  const addEsm = allExport.addEsm;

  console.log("cjs require cjs", addCjs(1, 2));

  console.log("cjs require esm", addEsm(1, 2));

  console.log(defaultEsm);
}

run();
