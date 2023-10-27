import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Resource Name',
    example: 'Basic',
  })
  resourceName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Filename without Extension',
    example: 'Basic',
  })
  filenameWithoutExtension: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'File Extension',
    example: 'zip',
  })
  fileExtension: string;

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
