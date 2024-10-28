import { wss } from "..";
import {
  RegistrationData,
  RegistrationMessage,
} from "../interfaces/interfaces";
import { createRoomHandler } from "./createRoomHandler";
import { localBD } from "../localBD/localBD";
export const registrationHandler = (message: RegistrationMessage) => {
  const data: RegistrationData = JSON.parse(message.data);

  const newUser = {
    name: data.name,
    password: data.password,
    index: message.id,
  };

  console.log("New user registered:", newUser);
  localBD.push(newUser);
};
