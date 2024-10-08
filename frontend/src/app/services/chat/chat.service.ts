import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChat } from '../../interfaces/chat/chat';
import { environment } from '../../../environments/environment';
import { IResponseChat } from '../../interfaces/chat/response-chat';
import { BehaviorSubject } from 'rxjs';

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

  getOne() {

  }

  getAllbyUserId(id: number) {
    return this.http.get<IResponseChat[]>(`${environment.apiUrl}/chat/${id}`).subscribe((chats: IResponseChat[]) => {
      this.chatsSubject.next(chats);
    })
  }
}
