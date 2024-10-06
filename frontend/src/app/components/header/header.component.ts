import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  avatar: string = '';

  constructor(private profileService: ProfileService, private authService: AuthService){}
  
  ngOnInit(): void {
    this.getAvatar()
  }

  logout() {
    this.authService.logout()
  }

  getAvatar() {
    this.profileService.getAvatar().subscribe((avatarUrl) => {
      this.avatar = avatarUrl;
    })
  }
}
