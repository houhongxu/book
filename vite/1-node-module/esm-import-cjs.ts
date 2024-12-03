console.log("<==================== esm-import-cjs.ts ====================>");

// ts即可支持default和named导出同时使用，属性esModuleInterop默认开启

import defaultCjs, { addCjs, addDefault } from "./add-cjs.cjs";

console.log(defaultCjs, addCjs, addDefault);
