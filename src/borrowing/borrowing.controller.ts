import {
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { BorrowingService } from './borrowing.service';
import { BookService } from 'src/book/book.service';
import { Borrowing } from './entities/borrowing.entity';
import { User } from 'src/core/decorators/user.decorator';
import { ReqUser } from 'src/core/types/requser';

@Controller('borrowing')
@ApiTags('borrowing')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class BorrowingController {
  constructor(
    private readonly borrowingService: BorrowingService,
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  @Post(':bookId')
  @ApiResponse({
    type: Borrowing,
  })
  async create(
    @Param('bookId') bookId: string,
    @User() user: ReqUser,
  ): Promise<Borrowing> {
    const book = await this.bookService.findOne(+bookId);
    if (book == null) {
      throw new ConflictException('Book does not exist');
    }
    const userDb = await this.userService.findOne(user.name);
    if (userDb == null) {
      throw new ConflictException();
    }
    const borrowing = await this.borrowingService.findOne(book);
    if (borrowing != null) {
      throw new ConflictException('Book is already borrowed');
    }
    return this.borrowingService.borrow(book, userDb);
  }

  @Delete(':bookId')
  async delete(@Param('bookId') bookId: string, @User() user: ReqUser) {
    const book = await this.bookService.findOne(+bookId);
    if (book == null) {
      throw new NotFoundException('Book does not exist');
    }
    const borrowing = await this.borrowingService.findOne(book);
    if (borrowing == null) {
      throw new NotFoundException('Borrowing does not exist');
    }
    const userDb = await this.userService.findOne(user.name);
    if (userDb == null) {
      throw new ConflictException();
    }
    console.log(userDb, borrowing);
    if (!userDb.isAdmin || userDb.id != borrowing.createdBy.id) {
      throw new ForbiddenException();
    }
    await this.borrowingService.return(book);
    return {};
  }
}
