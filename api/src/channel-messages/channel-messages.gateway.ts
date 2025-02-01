import { MessageBody, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ChannelMessage } from "./channel-message.entity";

@WebSocketGateway()
export class ChannelMessagesGateway {
    @WebSocketServer()
    server;
    
    emitMessageCreated(@MessageBody() message : ChannelMessage) {
        this.server.emit('message-created', message);
    }
}