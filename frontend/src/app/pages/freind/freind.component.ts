import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavProfileComponent } from '../../components/nav-profile/nav-profile.component';
import { FreindService } from '../../services/freind/freind.service';
import { IMyRequest } from '../../interfaces/freind/my-request';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../../interfaces/profile/token';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IResponseUser } from '../../interfaces/freind/response-user';
import { IResponseFreind } from '../../interfaces/freind/response-freind';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ICreateRequest } from '../../interfaces/freind/create-request';
import { MessageModalComponent } from '../../components/message-modal/message-modal.component';
// import { MessageModalComponent } from '../../components/message-modal/message-modal.component';

@Component({
  selector: 'app-freind',
  standalone: true,
  imports: [
    HeaderComponent,
    NavProfileComponent,
    ReactiveFormsModule,
    CommonModule,
    MessageModalComponent
  ],
  templateUrl: './freind.component.html',
  styleUrl: './freind.component.scss',
})
export class FreindComponent implements OnInit {
  request: IMyRequest[] = [];
  id: number = 0;
  form = new FormGroup({
    select: new FormControl('value2'),
  });
  freind: boolean = true;
  users: IResponseUser[] = [];
  freinds: IResponseFreind[] = [];
  apiUrl: string = `${environment.apiUrlImages}`;
  selectedFreind: Partial<IResponseFreind> = {};
  messageModal: boolean = false;

  constructor(
    private freindService: FreindService,
    private appRef: ApplicationRef,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: IToken = jwtDecode(token);
      this.id = decodedToken.id;
    }
    this.getMyRequest();
    this.getFreinds();
  }

  getMyRequest() {
    this.freindService
      .getMyRequest(this.id)
      .subscribe((request: IMyRequest[]) => {
        this.request = request;
      });
  }

  onChange(event: any) {
    this.form.controls.select.setValue(event.target.value);
    if (this.form.value.select == 'value1') {
      this.freind = false;
      this.getAllUsers();
    } else {
      this.freind = true;
    }
  }

  getAllUsers() {
    this.freindService.getUsersAll().subscribe((users: IResponseUser[]) => {
      users = users.filter((user) => user.id !== this.id);
      this.users = users;
    });
  }

  getFreinds() {
    this.freindService
      .getFreinds(this.id)
      .subscribe((freinds: IResponseFreind[]) => {
        console.log(freinds);
        console.log(this.id);
        freinds = freinds.filter((freind) => freind.id !== this.id);
        this.freinds = freinds;
      });
  }

  createRequestFreind(id: number) {
    const dto: ICreateRequest = {
      userId: this.id,
      freindId: id,
      status: 'prending',
    };
    this.freindService.createRequest(dto).subscribe((data: IMyRequest) => {
      const user = this.users.find((u) => u.id === id);
      if (user) {
        user.receivedFreindRequests.push(data);
      }
      this.appRef.tick();
    });
  }

  openModal(freind: IResponseFreind) {
    this.selectedFreind = freind;
    this.messageModal = true;
  }

  closeModal() {
    this.messageModal = false;
  }
}
