import { OnGatewayConnection, WebSocketGateway } from "@nestjs/websockets";





@WebSocketGateway(5050, {
    cors: {
        origin: '*'
    },
})
export class SocketService implements OnGatewayConnection {

    handleConnection(client: any) {
        console.log(client);
        console.log("CONNECTED");
    }
}