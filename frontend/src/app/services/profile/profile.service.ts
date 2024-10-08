import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../../interfaces/profile/user';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  private avatarUrlSubject = new Subject<string>();
  private userSubject = new Subject<IUser>();

  private isModalSubject = new Subject<boolean>();
  isModal: boolean = false;

  showModal(event: any) {
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

  editAvatar(file: File, userId: number) {
    const formData = new FormData;
    formData.append('userId', String(userId));
    formData.append('file', file);
    console.log(file);
    return this.http.put(`${environment.apiUrl}/user/avatar`, formData).pipe(
      tap(() => {
        this.getUser(userId); // refresh user data and avatar URL
      })
    );
  }
}
