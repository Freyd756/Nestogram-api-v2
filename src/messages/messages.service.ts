import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageDto } from '@messages/message.dto';
import { IMessage } from '@messages/message.schema';

@Injectable()
export class MessagesService {
  public constructor(
    @InjectModel('Messages') private readonly _messageModel: Model<IMessage>,
  ) {}

  public async getMessages(): Promise<IMessage[]> {
    try {
      return this._messageModel.find({}).lean();
    } catch (err) {
      return null;
    }
  }
  public async getMessagesByRoomId(id: string): Promise<IMessage[]> {
    try {
      return this._messageModel.find({ roomId: id }).lean();
    } catch (err) {
      return null;
    }
  }

  public async createNewMessage(message: MessageDto): Promise<any> {
    try {
      const createdMessage = new this._messageModel(message);
      return createdMessage.save();
    } catch (e) {
      return null;
    }
  }
  public async removeMessage(messageId: string): Promise<any> {
    try {
      return this._messageModel.findByIdAndRemove({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _id: Types.ObjectId(messageId),
      });
    } catch (e) {
      return null;
    }
  }
  public async updateMessage(
    messageId: string,
    text: string,
  ): Promise<IMessage> {
    try {
      return this._messageModel.findByIdAndUpdate(
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          _id: Types.ObjectId(messageId),
        },
        { $set: { text } },
      );
    } catch (e) {
      return null;
    }
  }
}
