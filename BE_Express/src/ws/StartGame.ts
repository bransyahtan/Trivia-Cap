import WebSocket from "ws";

var ws = new WebSocket("ws://localhost:3000");

// matchmaking
export default function startGame() {
  ws.send("OK");
}
