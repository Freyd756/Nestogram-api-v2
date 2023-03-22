import { CrypticoService } from './../shared/services/cryptico.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '@users/dtos/user.dto';
import { IUser } from '@users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  public createPass = async (password: string): Promise<string> => {
    const numberTypeSalt = process.env.SECRETE || '12';
    const salt = await bcrypt.genSalt(+numberTypeSalt);
    return bcrypt.hash(password, salt);
  };
  public constructor(
    @InjectModel('Users')
    private readonly _userModel: Model<IUser>,
    private readonly _cryptoService: CrypticoService,
  ) {}

  public async login({ login, password }: UserDto): Promise<any | IUser> {
    try {
      const user = await this._userModel.findOne({ login }, { __v: 0 });
      if (!user || (user && !(await bcrypt.compare(password, user.password)))) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid email and/or password',
        };
      }
      user.token = await this._cryptoService.encrypt(
        JSON.stringify({
          login: user.login,
          password: user.password,
          _id: `${user._id}`,
          exTime: Date.now() + 3600 * 1000,
        }),
      );
      user.password = null;
      return user;
    } catch (e) {
      return null;
    }
  }
  public async signup(user: UserDto): Promise<void | string> {
    try {
      const newUser = new this._userModel({
        ...user,
        password: await this.createPass(user.password),
      });
      await newUser.save();
    } catch (e) {
      return 'User already exist';
    }
  }
}
