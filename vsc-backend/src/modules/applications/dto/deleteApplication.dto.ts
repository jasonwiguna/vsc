import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteApplicationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  id: string;
}
