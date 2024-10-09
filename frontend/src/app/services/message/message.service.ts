import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IResponseMessage } from '../../interfaces/message/response-message';
import { BehaviorSubject } from 'rxjs';
import { ICreateMessage } from '../../interfaces/message/create-message';
import { WebSocketService } from '../websocket/websocket.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  formData: FormData | null = null;
  private messageSubject = new BehaviorSubject<IResponseMessage[]>([]);
  messages$ = this.messageSubject.asObservable();
  id: number = 0;
  //  currentUser: Partial<IUser> = {};

  constructor(private http: HttpClient, private socketService: WebSocketService) { }

  subscribeToMessages(chatId: string) {
    this.socketService.socket?.on('message', (message: any) => {
      this.messageSubject.next([message, ...this.messageSubject.getValue()]);
    });
  }
  


  getMessages(id: string | null) {
    this.http.get<IResponseMessage[]>(`${environment.apiUrl}/message/${id}`).subscribe((messages: IResponseMessage[]) => {
      this.messageSubject.next(messages);
    })
  }

  getMessagesSubject() {
    return this.messageSubject;
  }

  createMessage(message: ICreateMessage, chatId: string, file: any) {
    this.http.post<IResponseMessage>(`${environment.apiUrl}/message`, message).subscribe((message: IResponseMessage) => {
      console.log(message);
      this.id = message.id
      if (file) {
        this.formData = new FormData;
        this.formData.append('messageId', String(this.id));
        this.formData.append('chatId', String(chatId));
        this.formData.append('file', file);
        this.createFile(this.formData)?.subscribe((data: any) => {
          const responseMessage: IResponseMessage = {
            ...message,
            files: [data]
          };
          this.messageSubject.next([...this.messageSubject.getValue(), responseMessage]);
          this.getMessages(chatId);
          this.socketService.sendMessage(responseMessage); // отправляем сообщение по сокету только после загрузки изображения
        });
      } else {
        this.messageSubject.next([...this.messageSubject.getValue(), message]);
        this.getMessages(chatId);
        this.socketService.sendMessage(message); // отправляем сообщение по сокету
      }
    })
  }



  createFile(formData: FormData) {
    if (formData && formData.get('file') !== null && formData.get('file') !== undefined) {
      return this.http.post(`${environment.apiUrl}/message/file`, formData)
    }
    else {
      return null;
    }
  }

  addMessageInChat(dto: ICreateMessage) {
    return this.http.post<IResponseMessage>(`${environment.apiUrl}/message`, dto)
  }
}
