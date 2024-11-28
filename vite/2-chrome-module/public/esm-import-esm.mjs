import defaultEsm, { addEsm } from "./add-mjs.mjs";

console.log("esm import esm", addEsm(1, 2));

console.log("defaultEsm", defaultEsm);

// 浏览器 esm 可以支持模块的相对路径导入导出
