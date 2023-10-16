import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';
import { Subscription } from './subscription.schema';
import { Application } from './application.schema';

@Entity()
export class PricingPackage {
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
    description: 'Package Name',
    example: 'string',
  })
  packageName!: string;

  @Column({ type: 'float' })
  @ApiProperty({
    type: Number,
    description: 'Monthly Price',
    example: 10,
  })
  monthlyPrice!: number;

  @Column({ type: 'float' })
  @ApiProperty({
    type: Number,
    description: 'Annual Price',
    example: 100,
  })
  annualPrice!: number;

  @Column({ type: 'float' })
  @ApiProperty({
    type: Number,
    description: 'Perpetual Price',
    example: 100,
  })
  perpetualPrice!: number;

  @Column({ type: 'boolean' })
  @ApiProperty({
    type: Boolean,
    description: 'Active',
    example: true,
  })
  active!: boolean;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Application ID',
    example: 'string',
  })
  applicationId?: string;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @OneToMany(() => Subscription, (subscription) => subscription.pricingPackage)
  subscriptions: Subscription[];

  @ManyToOne(() => Application, (application) => application.pricingPackages)
  application: Application;
}
