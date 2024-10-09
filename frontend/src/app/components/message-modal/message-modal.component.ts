import { Component, Input, OnInit } from '@angular/core';
import { IResponseFreind } from '../../interfaces/freind/response-freind';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';
import { ICreateMessage } from '../../interfaces/message/create-message';
import { ChatService } from '../../services/chat/chat.service';
import { IToken } from '../../interfaces/profile/token';
import { jwtDecode } from 'jwt-decode';
import { IResponseChat } from '../../interfaces/chat/response-chat';
import { IChat } from '../../interfaces/chat/chat';
import { IAddUser } from '../../interfaces/chat/add-user';
import { FreindService } from '../../services/freind/freind.service';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss',
})
export class MessageModalComponent implements OnInit {
  apiImageUrl: string = '';
  textControl = new FormControl('');
  userId: number = 0;
  isHaveChat: boolean = false;
  chats: IResponseChat[] = [];
  // isModal: boolean;
  // freindId: number = 0;

  @Input() freind: Partial<IResponseFreind> = {};

  constructor(
    private messageService: MessageService,
    private chatService: ChatService,
    private freindService: FreindService,
  ) {
    this.apiImageUrl = environment.apiUrlImages;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: IToken = jwtDecode(token);
      this.userId = decodedToken.id;
      console.log(this.userId);
    }
    this.getChat();
    console.log(this.freind.id);
  }

  getChat() {
    this.chatService.getAllbyUserId(this.userId);
    this.chatService.chats$.subscribe((chats: IResponseChat[]) => {
      this.chats = chats;
    });
  }

  createMessage() {
    this.freindService.hidenModal(); // Скрываем модалку
    const existingChat = this.chats.find((chat) => {
      if (chat.chatParticipants.length < 2) {
        return false;
      }
      const participantIds = chat.chatParticipants.map(participant => participant.userId);
      return (
        !chat.isGroup &&
        participantIds.includes(this.userId) &&
        participantIds.includes(Number(this.freind.id))
      );
    });


    if (existingChat) {
      console.log('Чата уже существует, отправим туда', existingChat);
      // Отправить сообщение в существующий чат
      const dto: ICreateMessage = {
        text: String(this.textControl.value),
        chatId: existingChat.id,
        userId: this.userId,
      };
      this.messageService.addMessageInChat(dto).subscribe((data) => {
        console.log(data);
      });
    } else {
      console.log('Создался новый чат');
      const dto: IChat = {
        userId: this.userId,
        name: `${this.freind.name}`,
        isGroup: false,
      };

      // Создаем новый чат
      this.chatService
        .createChatFreind(dto)
        .subscribe((data: IResponseChat) => {
          const chatId = data.id;
          const addUserDto: IAddUser = {
            userId: Number(this.freind.id),
            chatId: chatId,
          };

          // Добавляем второго пользователя в чат
          this.chatService.addUserInChat(addUserDto).subscribe(() => {
            // Отправить сообщение в новый чат
            const messageDto: ICreateMessage = {
              text: String(this.textControl.value),
              chatId: chatId,
              userId: this.userId,
            };
            this.messageService
              .addMessageInChat(messageDto)
              .subscribe((data) => {
                console.log(data);
              });
          });
        });
    }
  }
}
