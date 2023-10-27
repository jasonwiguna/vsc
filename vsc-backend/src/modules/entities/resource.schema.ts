import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';
import { Application } from './application.schema';

@Entity()
export class Resource {
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
  resourceName!: string;

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

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Application ID',
    example: 'string',
  })
  applicationId!: string;

  @Column({ type: 'integer' })
  @ApiProperty({
    type: Number,
    description: 'Priority',
    example: 1,
  })
  priority!: number;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Section',
    example: 'PAID',
  })
  section!: string;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @ManyToOne(() => Application, (application) => application.resources)
  application: Application;
}
