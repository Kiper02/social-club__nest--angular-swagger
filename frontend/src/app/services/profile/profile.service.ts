import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../../interfaces/profile/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  private avatarUrlSubject = new Subject<string>();
  private userSubject = new Subject<IUser>();

  getAvatar():Observable<string> {
    return this.avatarUrlSubject.asObservable()
  }

  getUserSubject() {
    return this.userSubject;
  }


  getUser(id: number){
    this.http
      .get<IUser>(`${environment.apiUrl}/user/${id}`)
      .subscribe((user: IUser) => {
        this.avatarUrlSubject.next( `${environment.apiUrlImages}/${user.avatar}`);   
        this.userSubject.next(user);
      });
  }
}
