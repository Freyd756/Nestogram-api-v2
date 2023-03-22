import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { MessageDto } from '@messages/message.dto';
import { MessagesService } from '@messages/messages.service';

@WebSocketGateway({ namespace: 'message' })
export class MessagesGateway {
  public clients = 0;
  public constructor(private readonly _messagesService: MessagesService) {}

  @WebSocketServer() server: Server;
  @SubscribeMessage('GET_MESSAGES_BACK_BY_ROOM')
  async handleGetMessagesByRoom(_client: Socket, room: string) {
    _client.join(room);
    const messages = await this._messagesService.getMessagesByRoomId(room);
    _client.emit('GET_MESSAGES_BACK_BY_ROOM_BACK', { messages, roomId: room });
  }
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(_client: Socket, room: any) {
    _client.leave(room);
    _client.emit('leftRoom', room);
  }

  @SubscribeMessage('CREATE_NEW_MESSAGE')
  async handleCreateNewMessage(_client: Socket, message: MessageDto) {
    const newMessage = await this._messagesService.createNewMessage(message);
    this.server.to(_client.id).emit('CREATE_NEW_MESSAGE_BACK', newMessage);
    _client.to(message.roomId).emit('CREATE_NEW_MESSAGE_BACK', newMessage);
  }

  @SubscribeMessage('USER_TYPING')
  async handleUserTyping(_client: Socket, payload: any) {
    _client.to(payload.roomId).emit('USER_TYPING_BACK', payload);
  }

  @SubscribeMessage('REMOVE_MESSAGE')
  async handleRemoveMessage(_client: Socket, messageId: string) {
    const { roomId } = await this._messagesService.removeMessage(messageId);
    !!roomId &&
      this.server.to(_client.id).emit('REMOVE_MESSAGE_BACK', {
        messageId,
        roomId,
      });
    !!roomId &&
      _client.to(roomId).emit('REMOVE_MESSAGE_BACK', {
        messageId,
        roomId,
      });
  }

  @SubscribeMessage('EDIT_MESSAGE')
  async handleEditMessage(
    _client: Socket,
    payload: { text: string; id: string },
  ) {
    const { text, id } = payload;
    const update = await this._messagesService.updateMessage(id, text);
    !!update &&
      this.server
        .to(_client.id)
        .emit('EDIT_MESSAGE_BACK', { ...payload, roomId: update.roomId });
    !!update &&
      _client
        .to(update.roomId)
        .emit('EDIT_MESSAGE_BACK', { ...payload, roomId: update.roomId });
  }
}
