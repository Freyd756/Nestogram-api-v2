import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class GetRoomDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public name: string;
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  public password: string;
  @ApiProperty()
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  public isProtected: boolean;
  public createdAt?: string;
  public createrId?: string;
}
