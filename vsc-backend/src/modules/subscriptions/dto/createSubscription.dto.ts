import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  pricingPackageId: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Monthly',
    example: true,
  })
  monthly: boolean;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Subscription Date',
    example: new Date(),
  })
  subscriptionDate: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Expiration Date',
    example: new Date(),
  })
  expirationDate: Date;
}

export class CreateSubscriptionRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'First Name',
    example: 'John',
  })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Last Name',
    example: 'Doe',
  })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Company',
    example: 'VStream Connect',
  })
  company: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'example@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  @ApiProperty({
    type: String,
    description: 'Phone Number',
    example: '8XXXXXXX',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Country',
    example: 'Singapore',
  })
  country: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Update Permission',
    example: true,
  })
  updatePermission: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  pricingPackageId: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Monthly',
    example: true,
  })
  monthly: boolean;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Subscription Date',
    example: new Date(),
  })
  subscriptionDate: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Expiration Date',
    example: new Date(),
  })
  expirationDate: Date;
}

export class RenewSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  pricingPackageId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'License Key',
    example: 'xxxx-xxxx-xxxx-xxxx',
  })
  key: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Monthly',
    example: true,
  })
  monthly: boolean;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Subscription Date',
    example: new Date(),
  })
  subscriptionDate: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Expiration Date',
    example: new Date(),
  })
  expirationDate: Date;
}
