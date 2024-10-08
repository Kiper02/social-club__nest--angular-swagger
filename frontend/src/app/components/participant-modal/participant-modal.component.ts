import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat/chat.service';
import { IResponseChatParticipant, IResponseParticipant } from '../../interfaces/chat/response-participant';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant-modal.component.html',
  styleUrl: './participant-modal.component.scss'
})
export class ParticipantModalComponent implements OnInit{
  chatId: string | null = null;
  participants: IResponseChatParticipant[] = []
  apiImageUrl: string = environment.apiUrlImages


  constructor(private route: ActivatedRoute, private chatService: ChatService) {}
  
  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.getParticipants();
  }

  getParticipants() {
    this.chatService.getChatsParticipant(Number(this.chatId)).subscribe((participants: IResponseChatParticipant[]) => {
      this.participants = participants;
    })
  }
  
}
