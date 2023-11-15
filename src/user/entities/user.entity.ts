import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Book } from 'src/book/entities/book.entity';
import { Borrowing } from 'src/borrowing/entities/borrowing.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @Column({ name: 'is_admin', nullable: false, default: false })
  isAdmin: boolean;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
