import { fileURLToPath } from "url";
import { dirname } from "path";

function getFilename(url) {
  return fileURLToPath(url);
}

function getDirname(url) {
  return dirname(getFilename(url));
}

export { getDirname, getFilename };
