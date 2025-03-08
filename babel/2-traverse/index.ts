import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const jsCodeString = "const a = 1";

const babelAst = parse(jsCodeString, { tokens: true });

traverse(
  babelAst,
  {
    enter(path, state) {
      console.log("enter", path.node.type, state);
      state.count++;
    },
    exit(path, state) {
      console.log("exit", path.node.type, state);
    },
    "Identifier|NumericLiteral"(path) {
      console.log("Identifier|NumericLiteral", path.node.type);
    },
  },
  undefined,
  { count: 1 }
);
