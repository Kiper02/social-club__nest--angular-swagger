import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FreindService {

  constructor(private http: HttpClient) { }
// accepted", "declined"

  createRequest() {
      
  }

 
  getRequestMe(id: number) {
      this.http.get(`${environment.apiUrl}/freind/request/${id}`)
  }


  getMyRequest(id: number) {
    this.http.get(`${environment.apiUrl}/freind/request/my/${id}`)
  }


  addToFreinds() {
   
  }


  getFreinds() {

  }


  acceptRequest() {

  }


  editRequest() {

  }
}
