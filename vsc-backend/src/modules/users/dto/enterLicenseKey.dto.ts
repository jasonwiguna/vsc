import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class EnterLicenseKeyDto {
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
  @ApiProperty({
    type: String,
    description: 'License Key',
    example: 'XXXX-XXXX-XXXX-XXXX',
  })
  key: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Hardware ID',
    example: 'XXXX-XXXX-XXXX-XXXX',
  })
  hid: string;
}
