import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class EditApplicationDto {
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
    description: 'Application Name',
    example: 'Basic Application',
  })
  applicationName: string;
}
