import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IMyRequest } from '../../interfaces/freind/my-request';
import { IResponseUser } from '../../interfaces/freind/response-user';
import { IResponseFreind } from '../../interfaces/freind/response-freind';
import { ICreateRequest } from '../../interfaces/freind/create-request';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreindService {

  private isModalSubject = new Subject<boolean>();
  isModal: boolean = false;

  constructor(private http: HttpClient) { }


  showModal(event: Event) {
    this.isModal = true;
    event.stopPropagation();
    this.isModalSubject.next(this.isModal);
  }

  hidenModal() {
    this.isModal = false;
    this.isModalSubject.next(this.isModal);
  }

  getIsModalSubject() {
    return this.isModalSubject.asObservable();
  }


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
