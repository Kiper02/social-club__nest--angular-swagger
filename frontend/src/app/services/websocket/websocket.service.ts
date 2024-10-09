import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { WebSocket } from 'ws';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  // private socket: WebSocket | null = null;
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


  // // Новый метод для отправки файла через сокет
  // sendFileThroughSocket(file: any, chatId: number) {
  //   this.socket?.emit('file', { file, chatId });
  // }
  
}
