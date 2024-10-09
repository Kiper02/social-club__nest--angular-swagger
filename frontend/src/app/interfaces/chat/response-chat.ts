import { IUser } from "../profile/user";

interface IChatParticipants {
  id: number,
  userId: number,
  chatId: number,
  createdAt: string,
  updatedAt: string,
  user: IUser
}

interface IMessage {
  id: number;
  text: string;
  chatId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseChat {
  id: number;
  name: string;
  isGroup: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
  chatParticipants: IChatParticipants[]
  users: IUser[]
  messages: IMessage[];
}

