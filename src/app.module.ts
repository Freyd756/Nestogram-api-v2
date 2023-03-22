import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { SharedModule } from '@/shared/shared.module';
import { RoomsModule } from '@/rooms/rooms.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? './environments/.production.env'
          : './environments/.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE') || process.env.DATABASE,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
    }),
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
