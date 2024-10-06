import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat/chat.service';
import { IChat } from '../../interfaces/chat/chat';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../../interfaces/profile/token';

@Component({
  selector: 'app-chat-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chat-modal.component.html',
  styleUrl: './chat-modal.component.scss'
})
export class ChatModalComponent implements OnInit {

  controlChat: FormControl;
  id: number = 0;

  constructor(private chatService: ChatService) {
    this.controlChat = new FormControl('')
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token) {
      const decodedToken: IToken = jwtDecode(token);
      this.id = decodedToken.id;
    }
  }


  createGroupChat() {
    
    const dto: IChat = {
      name: this.controlChat.value,
      isGroup: true,
      userId: this.id
    }
    console.log(dto);
    this.chatService.createGroupChat(dto)
  }
}
