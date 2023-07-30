import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

@Entity()
export class Authentication {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: 'GUID',
    example: 'string',
  })
  id!: string;

  @Column({ type: 'text' })
  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'example@email.com',
  })
  email!: string;

  @Column({ nullable: false })
  @ApiProperty({
    type: String,
    description: 'Password',
    example: '********',
  })
  password!: string;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }
}
