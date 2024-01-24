import express, { Request, Response } from "express";
import redis from "redis";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

import socketRoutes from "./routes/socket";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    allowedHeaders: "Access-Control-Allow-Origin",
  },
});

const port = 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express Trivia-Cap");
});

// Socket.IO middleware
io.use((socket, next) => {
  // Custom socket.IO middleware if needed
  next();
});

io.on("connection", socket => {
  socketRoutes(io, socket);
});
server.listen(port, "192.168.18.238", () => console.log("server running at :" + port));
