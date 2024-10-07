import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavProfileComponent } from '../../components/nav-profile/nav-profile.component';
import { ProfileService } from '../../services/profile/profile.service';
import { IToken } from '../../interfaces/profile/token';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../interfaces/profile/user';
import { RouterModule } from '@angular/router';
import { ChatService } from '../../services/chat/chat.service';
import { ChatModalComponent } from '../../components/chat-modal/chat-modal.component';
import { CommonModule } from '@angular/common';
import { IResponseChat } from '../../interfaces/chat/response-chat';
import { HooksService } from '../../services/chat/hooks.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    NavProfileComponent,
    RouterModule,
    ChatModalComponent,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  avatar: string = '';
  id: number = 0;
  user: Partial<IUser> = {};
  isModal: boolean = false;
  chats: IResponseChat[] = [];

  constructor(
    private profileService: ProfileService,
    private chatService: ChatService,
    private hooksService: HooksService
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: IToken = jwtDecode(token);
      this.id = decodedToken.id;
    }
    this.getAvatar();
    this.getUser();
    this.getChats();
    this.hooksService.useConnectSocket();
  }

  getAvatar() {
    this.profileService.getAvatar().subscribe((avatarUrl: string) => {
      this.avatar = avatarUrl;
    });
  }

  getUser() {
    this.profileService.getUser(this.id);
    this.profileService.getAvatar().subscribe((avatarUrl: string) => {
      this.avatar = avatarUrl;
    });
    this.profileService.getUserSubject().subscribe((user: IUser) => {
      this.user = user;
    });
  }

  showModal(event: any) {
    this.isModal = true;
    event.stopPropagation(); // prevent propagation to parent element
  }

  hideModal() {
    this.isModal = false;
  }

  onContentChatsClick(event: any) {
    this.hideModal();
    event.stopPropagation(); // prevent propagation to parent element
  }

  getChats() {
    this.chatService
      .getAllbyUserId(this.id)
      .subscribe((data: IResponseChat[]) => {
        this.chats = data;
        console.log(`id - ${this.id}`);
        console.log(data);
      });
  }
}
