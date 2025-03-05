import { parse } from "@babel/parser";

const jsCodeString = "const a = 1";

const babelAst = parse(jsCodeString, { tokens: true });

console.log(JSON.stringify(babelAst, null, 2));
