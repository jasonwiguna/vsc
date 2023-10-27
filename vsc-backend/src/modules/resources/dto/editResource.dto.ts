import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class EditResourceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Resource Name',
    example: 'Basic',
  })
  resourceName: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Priority',
    example: 1,
  })
  priority: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Application ID',
    example: 'xxxx',
  })
  applicationId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Section',
    example: 'PAID',
  })
  section: string;
}
