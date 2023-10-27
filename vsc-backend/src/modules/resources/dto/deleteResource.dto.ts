import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteResourceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  id: string;
}
