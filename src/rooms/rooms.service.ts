import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RoomDto } from '@rooms/dtos/room.dto';
import { IRoom } from '@rooms/room.schema';
import { UsersService } from '@users/users.service';

@Injectable()
export class RoomService {
  public constructor(
    @InjectModel('Rooms') private readonly _roomModel: Model<IRoom>,
    private readonly _usersService: UsersService,
  ) {}

  public async getRooms(): Promise<IRoom[]> {
    try {
      return this._roomModel.find({}).lean();
    } catch (err) {
      return null;
    }
  }
  public async findRoomsForUser(userId: string): Promise<IRoom[]> {
    try {
      return this._roomModel
        .find(
          {
            $or: [
              { createrId: userId },
              { members: { $elemMatch: { userId } } },
            ],
          },
          { __v: 0 },
        )
        .lean();
    } catch (err) {
      return null;
    }
  }
  public async createRoom(room: RoomDto): Promise<any> {
    try {
      const { name, avatar, _id } = await this._usersService.findUserById(
        room.createrId,
      );
      room.createdAt = Date.now();
      room.members = [{ name, logo: avatar, userId: `${_id}` }];
      const createdRoom = new this._roomModel(room);
      return createdRoom.save();
    } catch (err) {
      return null;
    }
  }
  public async removeRoom(roomId: string): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this._roomModel.remove({ _id: Types.ObjectId(roomId) });
    } catch (err) {
      return null;
    }
  }
  public async updateRoom(roomId: string, body: RoomDto): Promise<IRoom> {
    try {
      return this._roomModel.findByIdAndUpdate(
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          _id: Types.ObjectId(roomId),
        },
        { $set: body },
      );
    } catch (err) {
      return null;
    }
  }
}
