import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IMyRequest } from '../../interfaces/freind/my-request';
import { IResponseUser } from '../../interfaces/freind/response-user';
import { IResponseFreind } from '../../interfaces/freind/response-freind';
import { ICreateRequest } from '../../interfaces/freind/create-request';

@Injectable({
  providedIn: 'root'
})
export class FreindService {

  constructor(private http: HttpClient) { }
// accepted", "declined"

  createRequest(dto: ICreateRequest) {
      return this.http.post<IMyRequest>(`${environment.apiUrl}/freind/request`, dto)
  }

 
  getRequestMe(id: number) {
      return this.http.get(`${environment.apiUrl}/freind/request/${id}`)
  }


  getMyRequest(id: number) {
    return this.http.get<IMyRequest[]>(`${environment.apiUrl}/freind/request/my/${id}`)
  }


  addToFreinds() {
   
  }


  getFreinds(id: number) {
    return this.http.get<IResponseFreind[]>(`${environment.apiUrl}/freind/${id}`)
  }


  acceptRequest() {

  }


  editRequest() {

  }

  getUsersAll() {
    return this.http.get<IResponseUser[]>(`${environment.apiUrl}/user`);
  }
}
