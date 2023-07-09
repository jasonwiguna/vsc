import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class SuccessfulResponse {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Status',
    example: true,
  })
  status: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Error Message',
    example: 'string',
  })
  message: string;
}

export class ErrorResponse {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Error Status',
    example: false,
  })
  status: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Error Message',
    example: 'string',
  })
  message: string;
}
