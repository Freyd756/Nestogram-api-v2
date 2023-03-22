import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public login: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public password: string;
}
