import defaultEsm, { addEsm } from "./add-mjs.mjs";

console.log("esm import esm", addEsm(1, 2));

console.log("defaultEsm", defaultEsm);
