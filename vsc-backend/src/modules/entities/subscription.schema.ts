import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';
import { User } from './user.schema';
import { PricingPackage } from './pricingPackage.schema';

@Entity()
export class Subscription {
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
    description: 'User ID',
    example: 'string',
  })
  userId!: string;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Pricing Package ID',
    example: 'string',
  })
  pricingPackageId!: string;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'License Key',
    example: 'string',
  })
  key!: string;

  @Column({ type: 'boolean' })
  @ApiProperty({
    type: String,
    description: 'Package Payment',
    example: 'MONTHLY',
  })
  paymentPlan!: string;

  @Column({ type: 'boolean' })
  @ApiProperty({
    type: Boolean,
    description: 'Suspended',
    example: false,
  })
  suspended!: boolean;

  @CreateDateColumn()
  subscriptionDate!: Date;

  @CreateDateColumn()
  expirationDate!: Date;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @ManyToOne(
    () => PricingPackage,
    (pricingPackage) => pricingPackage.subscriptions,
  )
  pricingPackage: PricingPackage;
}
