import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class HooksService {

  constructor(private socketService: SocketService) { }

  useConnectSocket() {
    this.socketService.createConnection();
  }
}
