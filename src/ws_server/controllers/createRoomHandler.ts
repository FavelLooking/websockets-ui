import WebSocket from "ws";
import { createNewRoomMsg } from "../messages/messages";
export const createRoomHandler = (ws: WebSocket) => {
  console.log("new room was created");
  const stringifyMsg = JSON.stringify(createNewRoomMsg);
  ws.send(stringifyMsg);
};
