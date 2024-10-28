import { httpServer } from "./src/http_server/index";
import { PORT } from "./src/constants/constants";
import { wss } from "./src/ws_server/index";
import { registrationHandler } from "./src/ws_server/controllers/registrationHandler";
import {
  Message,
  RegistrationMessage,
} from "./src/ws_server/interfaces/interfaces";
//import { createRoomHandler } from "./src/ws_server/controllers/createRoomHandler";

httpServer.listen(PORT, () => {
  console.log(`Start static HTTP server on the ${PORT} port!`);
});

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ message: "WebSocket connection is established" }));

  ws.on("message", (message) => {
    const formattedMessage = message.toString();
    console.log("Received message:", formattedMessage);
    ws.send(formattedMessage);

    try {
      const parsedData: Message = JSON.parse(formattedMessage);
      console.log("Parsed data:", parsedData);

      switch (parsedData.type) {
        case "reg":
          registrationHandler(parsedData as RegistrationMessage, ws);
          //         createRoomHandler(ws);
          break;
        case "create_room":
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});
