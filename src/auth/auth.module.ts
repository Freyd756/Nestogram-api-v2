import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => SharedModule)],
})
export class AuthModule {}
