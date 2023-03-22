import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public text: string;
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  public userId: number;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public userName: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public type: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public roomId: string;
}
