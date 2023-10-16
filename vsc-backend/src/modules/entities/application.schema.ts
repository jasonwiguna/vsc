import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';
import { PricingPackage } from './pricingPackage.schema';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: 'GUID',
    example: 'string',
  })
  id!: string;

  // Add attributes here

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Application Name',
    example: 'string',
  })
  applicationName!: string;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Bucket',
    example: 'string',
  })
  bucket!: string;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Path',
    example: 'string',
  })
  path!: string;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Filename',
    example: 'string',
  })
  filename!: string;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @OneToMany(
    () => PricingPackage,
    (pricingPackage) => pricingPackage.application,
  )
  pricingPackages: PricingPackage[];
}
