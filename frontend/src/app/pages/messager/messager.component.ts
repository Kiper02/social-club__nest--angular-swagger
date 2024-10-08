import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavProfileComponent } from '../../components/nav-profile/nav-profile.component';
import { CommonModule } from '@angular/common';
import { IResponseMessage } from '../../interfaces/message/response-message';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message/message.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ICreateMessage } from '../../interfaces/message/create-message';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../../interfaces/profile/token';
import { environment } from '../../../environments/environment';
import { ChatService } from '../../services/chat/chat.service';
import { IOneChat } from '../../interfaces/chat/one-chat';
import { UsersModalComponent } from '../../components/users-modal/users-modal.component';
import { ParticipantModalComponent } from '../../components/participant-modal/participant-modal.component';

@Component({
  selector: 'app-messager',
  standalone: true,
  imports: [
    HeaderComponent,
    NavProfileComponent,
    CommonModule,
    ReactiveFormsModule,
    UsersModalComponent,
    ParticipantModalComponent
  ],
  templateUrl: './messager.component.html',
  styleUrl: './messager.component.scss',
})
export class MessagerComponent implements OnInit {
  messages: IResponseMessage[] = [];
  chatId: string | null = '';
  messageControl: FormControl;
  userId: number = 0;
  apiImageUrl: string = environment.apiUrlImages;
  imageUrl: string | null = null;
  isClip: boolean = false;
  messageId: number = 0;
  file: any;
  isGroupChat: boolean = false;
  isUserModal: boolean = false;
  isParticipantModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private appRef: ApplicationRef,
    private cdRef: ChangeDetectorRef,
    private chatService: ChatService
  ) {
    this.messageControl = new FormControl('');
  }

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('id');
    if (this.chatId) {
      this.getMessages();
      this.checkIsGroup()
      this.getChat()
    }

    const token = localStorage.getItem('token');
    if(token) {
      const decodedToken: IToken = jwtDecode(token);
      this.userId = decodedToken.id;
    }
  }

  getChat() {
    this.chatService.getOne(Number(this.chatId)).subscribe((chat: IOneChat) => {
       this.isGroupChat = chat.isGroup;
    })
  }

  getMessages() {
    this.messageService.getMessages(this.chatId);
    this.messageService.getMessagesSubject().subscribe((messages: IResponseMessage[]) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    })
  }

  createMessage() {
    const dto: ICreateMessage = {
      text: this.messageControl.value,
      chatId: Number(this.chatId),
      userId: this.userId
    }
    if(this.chatId) {
      this.messageService.createMessage(dto, this.chatId, this.file);
      this.isClip = false
      this.messageControl.reset()
      this.appRef.tick();
      this.messageId = this.messageService.id;
    }
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files[0]) {
      this.isClip = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.file = files[0]
    }
  }
  
  checkIsGroup() {
    this.chatService.getOne(Number(this.chatId)).subscribe((chat: IOneChat) => {
      this.isGroupChat = chat.isGroup;
    })
  }

  showUsersModal(event: Event) {
    event.stopPropagation();
    this.isUserModal = true;
  }

  hidenUsersModal() {
    this.isUserModal = false;
  }

  showParticipantModal(event: Event) {
    event.stopPropagation();
    this.isParticipantModal = true;
  }

  hidenParticipantModal() {
    this.isParticipantModal = false;
  }
}
