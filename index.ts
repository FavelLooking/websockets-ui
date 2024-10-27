import { httpServer } from "./src/http_server/index";
import { PORT } from "./src/constants/constants";
import { wss } from "./src/ws_server/index";

httpServer.listen(PORT, () => {
  console.log(`Start static HTTP server on the ${PORT} port!`);
});

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ message: "WebSocket connection is established" }));

  ws.on("message", (message) => {
    console.log("Received message:", message);
    ws.send(JSON.stringify({ response: `Send: ${message}` }));
  });
});
