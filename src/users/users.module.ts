import { Module } from '@nestjs/common';
import { UsersController } from '@users/users.controller';
import { SharedModule } from '@shared/shared.module';
import { forwardRef } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  imports: [forwardRef(() => SharedModule)],
})
export class UsersModule {}
