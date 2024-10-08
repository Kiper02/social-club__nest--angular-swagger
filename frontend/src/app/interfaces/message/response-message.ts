import { IUser } from "../profile/user";
import { IFile } from "./file";

export interface IResponseMessage {
  id: number;
  text: string;
  chatId: number;
  userId: number;
  user: IUser;
  files: IFile[];
  createdAt: string;
  updatedAt: string;
}
