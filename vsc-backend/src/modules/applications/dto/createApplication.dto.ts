import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Application Name',
    example: 'Basic Application',
  })
  applicationName: string;

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
}
