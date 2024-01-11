import WebSocket from "ws";
import startGame from "./StartGame";

export default function handleConnections(ws: WebSocket) {
  console.log("+new client conected");

  ws.on("message", stream => {
    const req = stream.toString("utf-8");

    const { event, data } = JSON.parse(req);

    console.log(event, data);
    ws.close();
    return;

    ws.emit(event, data);
  });

  ws.on("startGame", startGame);

  ws.on("close", () => console.log("-client disconn ected"));
}
