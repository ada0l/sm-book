import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'name', nullable: false, unique: true })
  name: string;

  @Column({ name: 'hashed_password', nullable: false })
  @Exclude()
  @ApiHideProperty()
  hashedPassword: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
