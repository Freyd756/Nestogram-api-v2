import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from '@users/schemas/user.schema';
import { UsersService } from '@users/users.service';
import { CrypticoService } from './cryptico.service';

@Injectable()
export class CredsService {
  public constructor(
    private readonly _userService: UsersService,
    private readonly _cryptoService: CrypticoService,
  ) {}
  public async checkUser(
    creds: string,
  ): Promise<{ data: IUser; error: { type: HttpStatus; text: string } }> {
    try {
      if (!creds) {
        return {
          data: null,
          error: {
            type: HttpStatus.UNAUTHORIZED,
            text: 'Creds does not exists!',
          },
        };
      }
      const decryptedCreds = await this._cryptoService.decrypt(creds);
      if (!decryptedCreds) {
        return {
          data: null,
          error: {
            type: HttpStatus.UNAUTHORIZED,
            text: 'Incorrect credentials',
          },
        };
      }
      const { login, password } = decryptedCreds;
      const user = await this._userService.findUserByLogin(login);
      const { password: userPass, login: userLogin } = user;
      if (userPass !== password || login !== userLogin) {
        return {
          data: null,
          error: { type: HttpStatus.UNAUTHORIZED, text: 'Creds is wrong!' },
        };
      }
      return { data: user, error: null };
    } catch (error) {
      return error;
    }
  }
}
