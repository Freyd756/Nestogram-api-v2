import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { MessagesModule } from '@messages/messages.module';
import { UsersModule } from '@users/users.module';
import { SharedService } from '@shared/shared.service';
import { UsersService } from '@users/users.service';
import { AuthService } from '@auth/auth.service';
import { MessagesService } from '@messages/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '@users/schemas/user.schema';
import { CrypticoService } from '@shared/services/cryptico.service';
import { messageSchema } from '@messages/message.schema';
import { roomSchema } from '@rooms/room.schema';
import { RoomService } from '@rooms/rooms.service';
import { RoomsModule } from '@rooms/rooms.module';
import { CredsService } from '@shared/services/creds.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MessagesModule,
    RoomsModule,
    MongooseModule.forFeature([
      { name: 'Users', schema: userSchema },
      { name: 'Messages', schema: messageSchema },
      { name: 'Rooms', schema: roomSchema },
    ]),
  ],
  providers: [
    CredsService,
    SharedService,
    UsersService,
    AuthService,
    MessagesService,
    CrypticoService,
    RoomService,
  ],
  exports: [
    CredsService,
    UsersService,
    AuthService,
    MessagesService,
    CrypticoService,
    MongooseModule,
    RoomService,
  ],
})
export class SharedModule {}
