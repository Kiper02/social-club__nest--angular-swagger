import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: Socket | null = null;

  constructor() { }

  createConnection() {
    this.socket = io('http://localhost:5000')


    this.socket.on("connect", () => {
      console.log('CONNECTED');
    })

    this.socket.on('disconnect', (e) => {
      console.log("DISCONNECTED ");
    })
  }

  sendMessage(message: any) {
    this.socket?.emit('message', message)
  }

  joinRoom(chatId: number) {
    this.socket?.emit('joinRoom', chatId)
  }
  
}
