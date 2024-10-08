import { Component, OnInit } from '@angular/core';
import { IResponseFreind } from '../../interfaces/freind/response-freind';
import { FreindService } from '../../services/freind/freind.service';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../../interfaces/profile/token';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { IAddUser } from '../../interfaces/chat/add-user';
import { ChatService } from '../../services/chat/chat.service';
import { IResponseParticipant } from '../../interfaces/chat/response-participant';

@Component({
  selector: 'app-users-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-modal.component.html',
  styleUrl: './users-modal.component.scss'
})
export class UsersModalComponent implements OnInit {
  freinds: IResponseFreind[] = [];
  id: number = 0;
  apiImageUrl: string = environment.apiUrlImages;
  chatId: string | null = '';

  constructor(private freindService: FreindService, private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token) {
      const decodedToken: IToken = jwtDecode(token);
      this.id = decodedToken.id;
    }
    
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.getFreinds();
  }

  getFreinds() {
    const idChat = Number(this.chatId);
  
    this.freindService.getFreinds(this.id).subscribe((freinds: IResponseFreind[]) => {
      // Создаем массив Promises для всех запросов участников чатов
      const participantRequests = freinds.map(freind =>
        this.chatService.getAllChatParticipantsByUser(freind.id).toPromise().catch(() => undefined) // Обрабатываем ошибки
      );
  
      // Ждем завершения всех запросов
      Promise.all(participantRequests).then((participants: (IResponseParticipant[] | undefined)[]) => {
        // Фильтруем тех, кто уже состоит в чате
        const filteredFreinds = freinds.filter((freind, index) => {
          const participantList = participants[index];
          // Если participantList существует и найдется чат с таким же id, исключаем друга
          const isInChat = participantList && participantList.some(participant => participant.chatId === idChat);
          return !isInChat;
        });
  
        this.freinds = filteredFreinds;
        console.log('Оставшиеся друзья:', this.freinds);
        console.log('Текущий пользователь:', this.id);
      });
    });
  }
  
  

  addUser(freind: IResponseFreind) {
    const dto: IAddUser = {
      userId: freind.id,
      chatId: Number(this.chatId)
    }

    this.chatService.addUserInChat(dto).subscribe((data) => {
      console.log(data);
      const index = this.freinds.indexOf(freind);
      if (index !== -1) {
        this.freinds.splice(index, 1);
      }
    })
  }
}
