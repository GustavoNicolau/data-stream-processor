import express from "express";
import bodyParser from "body-parser";
import { createWriteStream } from "node:fs";

const output = createWriteStream("output.ndjson");

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});
const app = express();
app.use(bodyParser.json());
app.use(limiter);
const PORT = 3000;

app.post("/", async (req, res) => {
  console.log("receive", req.body);
  output.write(JSON.stringify(req.body) + "\n");
  return res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
