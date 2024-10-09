import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChat } from '../../interfaces/chat/chat';
import { environment } from '../../../environments/environment';
import { IResponseChat } from '../../interfaces/chat/response-chat';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOneChat } from '../../interfaces/chat/one-chat';
import { IAddUser } from '../../interfaces/chat/add-user';
import { IResponseChatParticipant, IResponseParticipant } from '../../interfaces/chat/response-participant';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chats: IResponseChat[] = [];

  private chatsSubject = new BehaviorSubject<IResponseChat[]>([]);
  chats$ = this.chatsSubject.asObservable();

  constructor(private http: HttpClient) { }

  createGroupChat(dto: IChat) {
    this.http.post<IResponseChat>(`${environment.apiUrl}/chat`, dto).subscribe((chat: IResponseChat) => {
      this.chatsSubject.next([...this.chatsSubject.getValue(), chat]);
    })
  }

  getOne(id: number) {
    return this.http.get<IOneChat>(`${environment.apiUrl}/chat/one/${id}`)
  }

  getAllbyUserId(id: number) {
    return this.http.get<IResponseChat[]>(`${environment.apiUrl}/chat/${id}`).subscribe((chats: IResponseChat[]) => {
      this.chatsSubject.next(chats);
    })
  }

  addUserInChat(dto: IAddUser) {
    return this.http.put(`${environment.apiUrl}/chat`, dto)
  }

  getAllChatParticipantsByUser(userId: number) {
    return this.http.get<IResponseParticipant[]>(`${environment.apiUrl}/chat/participants/${userId}`);
  }

  getChatsParticipant(chatId: number) {
    return this.http.get<IResponseChatParticipant[]>(`${environment.apiUrl}/chat/participants/check/${chatId}`)
  }

  createChatFreind(dto: IChat) {
    return this.http.post<IResponseChat>(`${environment.apiUrl}/chat`, dto)
  }
}
