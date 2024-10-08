import { IUser } from "../profile/user";

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
  users: IUser[]
  messages: IMessage[];
}

