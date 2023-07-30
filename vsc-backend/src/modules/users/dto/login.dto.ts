import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class LoginInputDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'example@email.com',
    example: 'example@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    description: 'Password',
    example: '******',
  })
  password: string;
}

export class LoginOutputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Token',
    example: 'string',
  })
  access_token: string;
}
