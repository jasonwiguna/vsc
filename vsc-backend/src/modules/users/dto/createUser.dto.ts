import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'First Name',
    example: 'John',
  })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Last Name',
    example: 'Doe',
  })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Company',
    example: 'VStream Connect',
  })
  company: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'example@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  @ApiProperty({
    type: String,
    description: 'Phone Number',
    example: '8XXXXXXX',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Country',
    example: 'Singapore',
  })
  country: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Update Permission',
    example: true,
  })
  updatePermission: boolean;
}
