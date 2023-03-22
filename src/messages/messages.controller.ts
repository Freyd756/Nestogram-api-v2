import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { MessageDto } from '@messages/message.dto';
import { MessagesService } from '@messages/messages.service';

@Controller('messages')
export class MessagesController {
  public constructor(private readonly _messagesService: MessagesService) {}
  @Get('byRoom/:roomId')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: 'Get messages' })
  @ApiResponse({
    description: 'Get messages success',
    type: MessageDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiBody({ type: MessageDto, required: false })
  public async getMessages(
    @Res()
    res: Response,
    @Param('roomId') roomId: string,
  ): Promise<Response> {
    try {
      const messages = await this._messagesService.getMessagesByRoomId(roomId);
      return res.status(HttpStatus.OK).json({ data: messages, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
