import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UserDto } from '@users/dtos/user.dto';
import { UsersService } from '@users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(private readonly _usersService: UsersService) {}
  @Get('/')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'Get users' })
  @ApiResponse({
    description: 'Get users success',
    type: UserDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiBody({ type: UserDto, required: false })
  public async getUsers(
    @Res()
    res: Response,
  ): Promise<Response> {
    try {
      const users = await this._usersService.findUsers();
      return res.status(HttpStatus.OK).json({ data: users, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @Get('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'Get user by id' })
  @ApiResponse({
    description: 'Get user by id success',
    type: UserDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiBody({ type: UserDto, required: false })
  public async getUserById(
    @Param('id') id: string,
    @Res()
    res: Response,
  ): Promise<Response> {
    try {
      const user = await this._usersService.findUserById(id);
      return res.status(HttpStatus.OK).json({ data: user, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @Delete(':id')
  @ApiOperation({ description: 'Delete user' })
  @ApiResponse({
    description: 'Delete user success',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiParam({ name: 'id', required: true, description: 'User id' })
  public async delete(@Param('id') userId: string, @Res() res: Response) {
    try {
      const result = await this._usersService.removeUser(userId);
      return res.status(HttpStatus.OK).json({
        data: result,
        error: null,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'Update user' })
  @ApiResponse({
    description: 'User was updated successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiBody({ type: UserDto, required: false })
  @ApiParam({ name: 'id', required: true, description: 'User id' })
  public async updateUser(
    @Body() body: UserDto,
    @Param('id') userId: string,
    @Res() res: Response,
  ) {
    try {
      const { nModified } = await this._usersService.updateUser(userId, body);
      return res.status(HttpStatus.OK).json({ data: !!nModified, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
