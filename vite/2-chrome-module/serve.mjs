import express from "express";
import { getDirname } from "../utils/shims.mjs";
import path from "path";

const __dirname = getDirname(import.meta.url);

const PORT = 3434;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.use(express.static(path.join(__dirname, "./public")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// chrome中至此也就有了模块规范
