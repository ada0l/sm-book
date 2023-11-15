import { Module } from '@nestjs/common';
import { BorrowingController } from './borrowing.controller';
import { BorrowingService } from './borrowing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { Borrowing } from './entities/borrowing.entity';
import { UserModule } from 'src/user/user.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    BookModule,
    UserModule,
    TypeOrmModule.forFeature([Book, User, Borrowing]),
  ],
  controllers: [BorrowingController],
  providers: [BorrowingService],
})
export class BorrowingModule {}
