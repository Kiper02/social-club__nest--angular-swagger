import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChat } from '../../interfaces/chat/chat';
import { environment } from '../../../environments/environment';
import { IResponseChat } from '../../interfaces/chat/response-chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  createGroupChat(dto: IChat) {
    this.http.post(`${environment.apiUrl}/chat`, dto).subscribe(data => {
      console.log(data);
    })
  }

  getOne() {

  }

  getAllbyUserId(id: number) {
    return this.http.get<IResponseChat[]>(`${environment.apiUrl}/chat/${id}`)
  }
}
