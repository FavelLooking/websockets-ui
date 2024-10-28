export interface RegistrationData {
  name: string;
  password: string;
}

export interface CreateRoomData {
  roomName: string;
}

interface BaseMessage<T> {
  type: string;
  data: T;
  id: number;
}

export interface User {
  name: string;
  password: string;
  index: number;
}

export type RegistrationMessage = BaseMessage<string>;
export type CreateRoomMessage = BaseMessage<CreateRoomData>;

export type Message = RegistrationMessage | CreateRoomMessage;
