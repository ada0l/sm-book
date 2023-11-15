import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'borrowing' })
export class Borrowing {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @OneToOne(() => Book, (book) => book.borrowing)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  constructor(partial: Partial<Borrowing>) {
    Object.assign(this, partial);
  }
}
