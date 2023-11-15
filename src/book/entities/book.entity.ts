import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Borrowing } from 'src/borrowing/entities/borrowing.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'author', nullable: false })
  author: string;

  @OneToOne(() => Borrowing, (borrowing) => borrowing.book)
  borrowing: Borrowing | null;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}
