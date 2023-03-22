import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsNotEmpty, IsBoolean } from 'class-validator';

export class RoomDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public name: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public password: string;
  @ApiProperty()
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  public isProtected: boolean;
  @ApiProperty()
  public createdAt?: number;
  @ApiProperty()
  public createrId: string;
  public members?: { name: string; userId: string; logo: string }[];
}
