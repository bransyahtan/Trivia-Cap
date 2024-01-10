import express, { Request, Response } from "express";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  noServer: true,
});

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

const s = app.listen(port, () => {
  console.log("Listening on :" + port);
});
s.on("upgrade", (req, socket, head) => {
  console.log("Upgrade..\nperform Auth...");

  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit("connection", ws, req);
  });
});
wss.on("connection", ws => {
  console.log("New client conected");
  ws.send("connection established");

  ws.on("close", () => console.log("Client Disconnected"));
});
