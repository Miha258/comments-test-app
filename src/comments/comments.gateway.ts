import {
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateCommentDto } from './dto/create-comment.dto';


@WebSocketGateway({ namespace: '/comments' })
export class CommentsGateway {
  @WebSocketServer()
  server: Server;

  notifyClients(event: string, @MessageBody() comment: CreateCommentDto) {
    this.server.emit(event, comment);
  }
}
