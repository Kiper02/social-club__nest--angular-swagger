import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavProfileComponent } from '../../components/nav-profile/nav-profile.component';
import { CommonModule } from '@angular/common';
import { IResponseMessage } from '../../interfaces/message/response-message';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message/message.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICreateMessage } from '../../interfaces/message/create-message';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../../interfaces/profile/token';
import { environment } from '../../../environments/environment';
import { ChatService } from '../../services/chat/chat.service';
import { IOneChat } from '../../interfaces/chat/one-chat';
import { UsersModalComponent } from '../../components/users-modal/users-modal.component';
import { ParticipantModalComponent } from '../../components/participant-modal/participant-modal.component';
import { WebSocketService } from '../../services/websocket/websocket.service';
import { ProfileService } from '../../services/profile/profile.service';
import { IUser } from '../../interfaces/profile/user';
import { Subscription } from 'rxjs';

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
  private messageSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private appRef: ApplicationRef,
    private cdRef: ChangeDetectorRef,
    private chatService: ChatService,
    private socketService: WebSocketService,
    private profileService: ProfileService
  ) {
    this.messageControl = new FormControl('', { validators: [Validators.required] });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('id');
    if (this.chatId) {
      this.getMessages();
      this.checkIsGroup()
      this.getChat()
      this.messageService.subscribeToMessages(this.chatId);
      console.log(this.chatId);
    }
    this.messageService.messages$.subscribe((messages: IResponseMessage[]) => {
      this.messages = messages;


    });

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
      messages.forEach((message) => {
        this.messages.unshift(message);
      });
      this.cdRef.markForCheck();
    })
  }

  createMessage() {
    
    if (this.messageControl.invalid) {
      console.log(this.messageControl.invalid && this.messageControl.touched);
      this.messageControl.markAsTouched();
      this.cdRef.detectChanges();
      return;
    }
  
    const dto: ICreateMessage = {
      text: this.messageControl.value,
      chatId: Number(this.chatId),
      userId: this.userId
    };
    console.log(dto);
    if(this.chatId) {
      this.profileService.getCurrentUserInChat(this.userId).subscribe((user: IUser) => {
        const message: IResponseMessage = {
          id: dto.userId,
          chatId: Number(this.chatId),
          userId: this.userId,
          text: dto.text,
          user: {
            id: user.id,
            surname: user.surname,
            patronymic: user.patronymic,
            password: user.password,
            createdAt: user.createdAt,
            email: user.email,
            updatedAt: user.updatedAt,
            name: user.name,
            avatar: user.avatar,
          },
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          files: [], 
        };
        console.log(message);
        this.messages.unshift(message);
      })
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
  socketMessage(message: any) {
    this.socketService.sendMessage(message);
  }
}
