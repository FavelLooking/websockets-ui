import { WebSocketServer } from "ws";
import * as dotenv from "dotenv";
import { WS_PORT } from "../constants/constants";

dotenv.config();

export const wss = new WebSocketServer({ port: WS_PORT });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ message: "WebSocket connection is established" }));
  console.log("WebSocket connection is established");

  ws.on("message", (message) => {
    console.log("Received message:", message);
    ws.send(JSON.stringify({ response: `Send: ${message}` }));
  });
});
