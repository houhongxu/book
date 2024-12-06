console.log("<==================== esm-import-cjs.ts ====================>");

// ts 即可支持default和named导出同时使用，属性esModuleInterop开启即可

import defaultCjs, { addCjs, addDefault } from "./add-cjs.cjs";

console.log("defaultCjs", defaultCjs);

console.log("addCjs, addDefault", addCjs, addDefault);
