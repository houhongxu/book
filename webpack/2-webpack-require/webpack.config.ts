import { Configuration } from "webpack";
import path from "path";

export const webpackConfig: Configuration = {
  mode: "none",
  entry: [
    path.join(__dirname, "add-cjs.cjs"),
    path.join(__dirname, "add-esm.mjs"),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  plugins: [],
};
