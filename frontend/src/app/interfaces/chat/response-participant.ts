import { IUser } from "../profile/user";

export interface IResponseParticipant {
  id: number;
  userId: number;
  chatId: number;
  createdAt: number;
  updatedAt: number;
}

export interface IResponseChatParticipant {
  id: number;
  userId: number;
  chatId: number;
  createdAt: number;
  updatedAt: number;
  user: IUser
}
