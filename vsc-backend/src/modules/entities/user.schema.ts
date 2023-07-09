import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';
import { Subscription } from './subscription.schema';

@Entity()
export class User {
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
    description: 'First Name',
    example: 'string',
  })
  firstname!: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    type: String,
    description: 'Last Name',
    example: 'string',
  })
  lastname?: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    type: String,
    description: 'Company Name',
    example: 'string',
  })
  company?: string;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'example@email.com',
  })
  email!: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    type: String,
    description: 'Phone Number',
    example: '8XXXXXXX',
  })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    type: String,
    description: 'Country',
    example: 'string',
  })
  country?: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    type: String,
    description: 'Hardware ID',
    example: 'string',
  })
  hid?: string;

  @Column({ type: 'boolean' })
  @ApiProperty({
    type: Boolean,
    description: 'Update Permission',
    example: true,
  })
  updatePermission!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
