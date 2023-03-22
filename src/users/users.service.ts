import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IUser } from '@users/schemas/user.schema';
import { UserDto } from '@users/dtos/user.dto';

@Injectable()
export class UsersService {
  public constructor(
    @InjectModel('Users') private readonly _userModel: Model<IUser>,
  ) {}

  public async create(user: UserDto): Promise<IUser> {
    try {
      const newUser = new this._userModel(user);
      return newUser.save();
    } catch (e) {
      return null;
    }
  }
  public async findUserById(id: string): Promise<IUser> {
    try {
      return this._userModel
        .findById(
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _id: Types.ObjectId(id),
          },
          { __V: 0 },
        )
        .lean();
    } catch (e) {
      return null;
    }
  }
  public async findUserByLogin(login: string): Promise<IUser> {
    try {
      return this._userModel
        .findOne(
          {
            login,
          },
          { __V: 0 },
        )
        .lean();
    } catch (e) {
      return null;
    }
  }

  public async findUsers(): Promise<IUser[]> {
    try {
      return this._userModel.find({}, { __V: 0 }).exec();
    } catch (e) {
      return null;
    }
  }
  public async updateUser(id: string, user: UserDto): Promise<any> {
    try {
      return (
        this._userModel
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .findOneAndUpdate({ _id: Types.ObjectId(id) }, { $set: user })
          .exec()
      );
    } catch (e) {
      return null;
    }
  }
  public async removeUser(id: string): Promise<any> {
    try {
      return (
        this._userModel
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .findOneAndRemove({ _id: Types.ObjectId(id) })
          .exec()
      );
    } catch (e) {
      return null;
    }
  }
}
