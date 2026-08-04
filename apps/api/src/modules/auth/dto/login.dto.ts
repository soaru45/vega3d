import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  identifier: string;

  @ApiProperty({ example: 'SenhaForte!123' })
  @IsString()
  @MinLength(1)
  password: string;
}
