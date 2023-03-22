import { forwardRef, Module } from '@nestjs/common';
import { MessagesGateway } from '@messages/messages.gateway';
import { MessagesService } from '@messages/messages.service';
import { SharedModule } from '@shared/shared.module';
import { MessagesController } from '@messages/messages.controller';

@Module({
  imports: [forwardRef(() => SharedModule)],
  controllers: [MessagesController],
  providers: [MessagesGateway, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
