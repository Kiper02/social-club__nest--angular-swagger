
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: '*'
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(

  ) {}

  afterInit(server: any) {
    console.log('Webcoket-сервер запущен');
  }
  handleDisconnect(client: any) {
    console.log('пользователь отключился');
  }
  handleConnection(client: any) {
    console.log('пользователь подключился');
  }


  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: any, room: string) {
    client.join(room);
    client.room = room; // добавляем свойство room к объекту client
  }  

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: any, room: string) {
  client.leave(room);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {

    if (client.room) {
      client.to(client.room).emit('message', payload);
      console.log(`Сообщение доставлено в комнату ${client.room}`);
    }
  }
}