import { IMyRequest } from "./my-request";

interface IFreind {
  id: number;
  freindId: number;
  status: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseUser {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  password: string;
  email: string;
  avatar: string;
  freinds: IFreind[];
  receivedFreindRequests: IMyRequest[]
  sentFreindRequests: IMyRequest[]
  createdAt: string;
  updatedAt: string;
}
