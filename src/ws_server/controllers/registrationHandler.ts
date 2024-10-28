import WebSocket from "ws";
import { WinnerData, UpdateWinnersMessage } from "../interfaces/interfaces";

import {
  RegistrationData,
  RegistrationMessage,
} from "../interfaces/interfaces";
//import { createRoomHandler } from "./createRoomHandler";
import { localBD } from "../localBD/localBD";
export const registrationHandler = (
  message: RegistrationMessage,
  ws: WebSocket,
) => {
  const data: RegistrationData = JSON.parse(message.data);

  const newUser = {
    name: data.name,
    password: data.password,
    index: message.id,
    wins: 0,
  };

  console.log("New user registered:", newUser);
  localBD.push(newUser);
  console.log("LocalBD before sending:", localBD);
  ws.send(JSON.stringify({ type: "update_room", data: localBD }));

  const winnersData: WinnerData[] = localBD.map((user) => ({
    name: user.name,
    wins: user.wins ?? 0,
  }));

  const winnersMessage: UpdateWinnersMessage = {
    type: "update_winners",
    data: winnersData,
    id: message.id,
  };

  ws.send(JSON.stringify(winnersMessage));
};
