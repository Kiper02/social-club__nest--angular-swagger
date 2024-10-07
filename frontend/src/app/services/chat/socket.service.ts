import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  socket: null | Socket = null;

  constructor() { }

  createConnection() {
    this.socket = io(`${environment.apiSocket}`)
  
    this.socket.on("connect", () => {
      console.log('connected');
    })

    this.socket.on("disconnect", (e) => {
      console.log('discronneced');
    })
  }
}
