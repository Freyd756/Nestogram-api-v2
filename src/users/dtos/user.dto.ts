import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDefined, IsNotEmpty } from 'class-validator';

export class UserDto {
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
  public token?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public name?: string;
}
