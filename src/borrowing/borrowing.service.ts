import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { Borrowing } from './entities/borrowing.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private borrowingRepository: Repository<Borrowing>,
  ) {}

  async findOne(book: Book) {
    return await this.borrowingRepository
      .createQueryBuilder('borrowing')
      .leftJoinAndSelect('borrowing.createdBy', 'user')
      .where({ book: { id: book.id } })
      .getOne();
  }

  async borrow(book: Book, user: User) {
    const borrowing = this.borrowingRepository.create({
      createdBy: user,
      book: book,
    });
    return await this.borrowingRepository.save(borrowing);
  }

  async return(book: Book) {
    return await this.borrowingRepository.delete({ book: { id: book.id } });
  }
}
