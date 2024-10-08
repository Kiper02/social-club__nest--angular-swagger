import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAcceptRequest } from '../../interfaces/request/accept-request';
import { environment } from '../../../environments/environment';
import { IResponseAcceptRequest } from '../../interfaces/request/response-accept-request';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {


  constructor(private http: HttpClient) { }

  acceptRequest(dto: IAcceptRequest) {
    return this.http.put<IResponseAcceptRequest>(`${environment.apiUrl}/freind`, dto)
  }

  getRequests(userId: number) {
    return this.http.get<IResponseAcceptRequest[]>(`${environment.apiUrl}/freind/request/${userId}`)
  }

  trackByFn(index: number, request: IResponseAcceptRequest): number {
    return request.id;
  }
  
}
