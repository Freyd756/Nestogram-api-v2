import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomDto } from '@rooms/dtos/room.dto';
import { IRoom } from '@rooms/room.schema';
import { Response } from 'express';
import { RoomService } from '@rooms/rooms.service';
import { UserCred } from '@shared/helpers/user-cred.decorator';
import { CredsService } from '@shared/services/creds.service';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  public constructor(
    private readonly _roomService: RoomService,
    private readonly _credsService: CredsService,
  ) {}
  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'Create room' })
  @ApiResponse({
    description: 'Create room success ',
    type: RoomDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async createRoom(
    @Res() res: Response,
    @Body() body: RoomDto,
    @UserCred() creds: string,
  ): Promise<Response<IRoom>> {
    try {
      const { data, error } = await this._credsService.checkUser(creds);
      if (error) {
        return res.status(error.type).json({
          data: null,
          error: error.text,
        });
      }
      const { _id } = data;
      body.createrId = `${_id}`;
      const room = await this._roomService.createRoom(body);
      return res.status(HttpStatus.OK).json({
        data: room,
        error: null,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        error,
      });
    }
  }

  @Get('')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'Get rooms' })
  @ApiResponse({
    description: 'Get rooms success',
    type: RoomDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiBody({ type: RoomDto, required: false })
  public async getRooms(
    @Res()
    res: Response,
    @UserCred() creds: string,
  ): Promise<Response> {
    try {
      const { data, error } = await this._credsService.checkUser(creds);
      if (error) {
        return res.status(error.type).json({
          data: null,
          error: error.text,
        });
      }
      const { _id } = data;
      const rooms =
        data && (await this._roomService.findRoomsForUser(`${_id}`));
      return res.status(HttpStatus.OK).json({ data: rooms, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
