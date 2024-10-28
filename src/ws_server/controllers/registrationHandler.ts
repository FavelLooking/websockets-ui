import WebSocket from "ws";
import { UpdateWinnersMessage } from "../interfaces/interfaces";

import {
  RegistrationData,
  RegistrationMessage,
} from "../interfaces/interfaces";
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

  const regResponse = {
    type: "reg",
    data: JSON.stringify({
      name: newUser.name,
      index: newUser.index,
      error: false,
      errorText: "",
    }),
    id: message.id,
  };
  ws.send(JSON.stringify(regResponse));

  const updateRoomMessage = {
    type: "update_room",
    data: JSON.stringify([
      {
        roomId: 1,
        roomUsers: localBD.map((user) => ({
          name: user.name,
          index: user.index,
        })),
      },
    ]),
    id: message.id,
  };
  ws.send(JSON.stringify(updateRoomMessage));

  const winnersData = Array.isArray(localBD)
    ? localBD.map((user) => ({
        name: user.name,
        wins: user.wins ?? 0,
      }))
    : [];

  console.log(winnersData);

  const winnersMessage: UpdateWinnersMessage = {
    type: "update_winners",
    data: JSON.stringify(winnersData),
    id: message.id,
  };

  console.log(winnersData);

  ws.send(JSON.stringify(winnersMessage));
};
