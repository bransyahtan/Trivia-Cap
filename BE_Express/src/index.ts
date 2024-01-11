import express, { Request, Response } from "express";
import webSocket from "./ws";

const app = express();
const ws = webSocket();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

const s = app.listen(port, () => {
  console.log("Listening on :" + port);
});

s.on("upgrade", ws);
