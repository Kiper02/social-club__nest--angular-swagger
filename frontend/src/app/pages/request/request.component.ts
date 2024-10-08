import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavProfileComponent } from '../../components/nav-profile/nav-profile.component';
import { HeaderComponent } from '../../components/header/header.component';
import { IResponseAcceptRequest } from '../../interfaces/request/response-accept-request';
import { RequestService } from '../../services/request/request.service';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../../interfaces/profile/token';
import { IAcceptRequest } from '../../interfaces/request/accept-request';
import { IResponseUser } from '../../interfaces/freind/response-user';
import { FreindService } from '../../services/freind/freind.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, NavProfileComponent, HeaderComponent],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent implements OnInit {
  requests: IResponseAcceptRequest[] = [];
  userId: number = 0;
  users: IResponseUser[] = []
  apiImageUrl = environment.apiUrlImages


  constructor(
    private requestService: RequestService,
    private freindService: FreindService
  ) {}


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token) {
      const decodedToken: IToken = jwtDecode(token)
      this.userId = decodedToken.id;
    }
    this.getAllRequest();
    this.getAllUsers();
  }


  getAllRequest() {
    this.requestService.getRequests(this.userId).subscribe((requests: IResponseAcceptRequest[]) => {
      this.requests = requests
    })
  }

  acceptRequest(requestId: number, freindId: number, request: IResponseAcceptRequest) {
    const dto: IAcceptRequest = {
      userId: this.userId,
      freindId,
      requestId,
      status: 'accepted'
    }


    this.requestService.acceptRequest(dto).subscribe((request: IResponseAcceptRequest) => {
      console.log(request);
    })
    const index = this.requests.indexOf(request);
    if(index !== -1) {
      this.requests.splice(index, 1);
    }
  }

  getAllUsers() {
    this.freindService.getUsersAll().subscribe((users: IResponseUser[]) => {
      this.users = users
    })
  }  
}
