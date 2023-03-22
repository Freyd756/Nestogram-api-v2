import { CrypticoService } from './../shared/services/cryptico.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserCred } from '@shared/helpers/user-cred.decorator';
import { UserDto } from '@users/dtos/user.dto';
import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@auth/dtos/login.dto';
import { UsersService } from '@users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly _authService: AuthService,
    private readonly _cryptoService: CrypticoService,
    private readonly _usersService: UsersService,
  ) {}
  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'Authorization' })
  @ApiResponse({
    description: 'Authorization success ',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async Auth(
    @Res() res: Response,
    @UserCred() creds: string,
  ): Promise<Response<any>> {
    try {
      if (!creds) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          data: null,
          error: 'Token does not exist',
        });
      }
      const { _id, exTime } = await this._cryptoService.decrypt(creds);
      if (+exTime < Date.now()) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          data: null,
          error: 'Token is expired',
        });
      }
      const user = await this._usersService.findUserById(_id);
      return res.status(HttpStatus.OK).json({
        data: user,
        error: null,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        error,
      });
    }
  }
  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'Login' })
  @ApiResponse({
    description: 'Login success ',
    type: UserDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiBody({ type: LoginDto, required: true })
  public async login(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<Response<any>> {
    try {
      const user = await this._authService.login(body);

      return res
        .status(user['status'] ? HttpStatus.UNAUTHORIZED : HttpStatus.OK)
        .json({
          data: user['error'] ? null : user,
          error: !user['error'] ? null : user.error,
        });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        error,
      });
    }
  }
  @Post('signup')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'Sign up' })
  @ApiResponse({
    description: 'Sign up success ',
    type: UserDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // @ApiBody({ type: AuthBodyDto, required: true })
  public async SignUp(
    @Body() body: UserDto,
    @Res() res: Response,
  ): Promise<Response<any>> {
    try {
      const errorText = await this._authService.signup(body);
      return res
        .status(errorText ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK)
        .json({
          data: null,
          error: errorText ? errorText : null,
        });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        error,
      });
    }
  }
}
