import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, user: User) {
    const book = this.bookRepository.create({
      title: createBookDto.title,
      author: createBookDto.title,
      createdBy: user,
    });
    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find({
      relations: ['borrowing'],
    });
    // return await this.bookRepository
    //   .createQueryBuilder('book')
    //   .leftJoin('book.borrowing', 'borrowing')
    //   .getMany();
    // return await this.bookRepository.find();
  }

  async findOne(id: number) {
    return await this.bookRepository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.save({
      id: id,
      title: updateBookDto.title,
      author: updateBookDto.author,
    });
  }

  async remove(id: number) {
    return await this.bookRepository.delete({ id: id });
  }
}
