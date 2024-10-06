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
  createdAt: string;
  updatedAt: string;
  messages: IMessage[];
}

