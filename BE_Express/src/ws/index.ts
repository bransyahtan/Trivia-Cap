import { WebSocketServer } from "ws";
import http from "http";
import handleConnections from "./connections";

const wss = new WebSocketServer({
  noServer: true,
});

// init websocket
export default function webSocket() {
  return (req: http.IncomingMessage, socket, head: Buffer): void => {
    wss.handleUpgrade(req, socket, head, ws => {
      wss.emit("connection", ws, req);
    });
  };
}

wss.on("connection", handleConnections);
