import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class EditPricingPackageDto {
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
    description: 'Package Name',
    example: 'Basic',
  })
  packageName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Monthly Price',
    example: 5,
  })
  monthlyPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Annual Price',
    example: 50,
  })
  annualPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Perpetual Price',
    example: 50,
  })
  perpetualPrice: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Application ID',
    example: 'xxxx',
  })
  applicationId: string;
}
