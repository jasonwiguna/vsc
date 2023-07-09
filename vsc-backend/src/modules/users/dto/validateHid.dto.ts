import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ValidateHidDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Hardware ID',
    example: 'XXXX-XXXX-XXXX-XXXX',
  })
  hid: string;
}

export class InvalidateHidDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  id: string;
}
