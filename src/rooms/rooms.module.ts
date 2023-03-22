import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { RoomsController } from '@rooms/rooms.controller';

@Module({
  controllers: [RoomsController],
  imports: [forwardRef(() => SharedModule)],
})
export class RoomsModule {}
