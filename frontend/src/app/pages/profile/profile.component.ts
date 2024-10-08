import { ApplicationRef, Component, OnInit } from '@angular/core';
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
import { MessagerComponent } from '../messager/messager.component';
import { environment } from '../../../environments/environment';
import { FreindService } from '../../services/freind/freind.service';
import { IResponseFreind } from '../../interfaces/freind/response-freind';
import { IResponseUser } from '../../interfaces/freind/response-user';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    NavProfileComponent,
    RouterModule,
    ChatModalComponent,
    CommonModule,
    MessagerComponent,
    EditModalComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  avatar: string = '';
  id: number = 0;
  user: Partial<IUser> = {};
  isModal: boolean;
  chats: IResponseChat[] = [];
  img: string = environment.apiUrlImages

  users: IResponseUser[] = []

  constructor(
    private profileService: ProfileService,
    private chatService: ChatService,
    private freindService: FreindService
  ) {
    this.isModal = this.profileService.isModal
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: IToken = jwtDecode(token);
      this.id = decodedToken.id;
    }
    this.getAvatar();
    this.getUser();
    this.getChats();
    this.getFreinds();

    this.profileService.getIsModalSubject().subscribe((isModal: boolean) => {
      this.isModal = isModal;
    });
  }

  getAvatar() {
    this.profileService.getAvatar().subscribe((avatarUrl: string) => {
      this.avatar = avatarUrl;
    });
  }

  getFreinds() {
    this.freindService.getUsersAll().subscribe((data: IResponseUser[]) => {
      this.users = data;
    })
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
    // this.isModal = true;
    // event.stopPropagation(); // prevent propagation to parent element
    this.profileService.showModal(event);
  }

  hideModal() {
    // this.isModal = false;
    this.profileService.hidenModal();
  }

  onContentChatsClick(event: any) {
    this.hideModal();
    event.stopPropagation(); // prevent propagation to parent element
  }

  getChats() {
    this.chatService.getAllbyUserId(this.id);
    this.chatService.chats$.subscribe((chats: IResponseChat[]) => {
      this.chats = chats;
    });
  }
 
  getEditAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);
      this.profileService.editAvatar(files[0], this.id).subscribe(data => {
        console.log(data);
      })
    }
  }
}
