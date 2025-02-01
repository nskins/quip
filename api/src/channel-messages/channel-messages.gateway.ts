import { MessageBody, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ChannelMessage } from "./channel-message.entity";

@WebSocketGateway(3002, { cors: {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
  }, transports: ['websocket', 'polling']})
export class ChannelMessagesGateway {
    @WebSocketServer()
    server;
    
    emitMessageCreated(@MessageBody() message : ChannelMessage) {
        this.server.emit('message-created', message);
    }
}