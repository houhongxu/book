import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const jsCodeString = "const a = 1";

const babelAst = parse(jsCodeString, { tokens: true, sourceFilename: "a.js" });

traverse(babelAst, {
  NumericLiteral(path) {
    path.node.value = 2;
  },
});

const result = generate(babelAst, { sourceMaps: true });

console.log(result.code, result.map);
