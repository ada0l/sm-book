import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ConflictException,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/core/decorators/user.decorator';
import { UserService } from 'src/user/user.service';
import { ReqUser } from 'src/core/types/requser';
import { Book } from './entities/book.entity';
import { AdminGuard } from 'src/core/guards/admin.guard';

@Controller('book')
@ApiTags('book')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiResponse({
    type: Book,
  })
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  async create(
    @Body() createBookDto: CreateBookDto,
    @User() user: ReqUser,
  ): Promise<Book> {
    const userDb = await this.userService.findOne(user.name);
    if (userDb == null) {
      throw new ConflictException();
    }
    return await this.bookService.create(createBookDto, userDb);
  }

  @Get()
  @ApiResponse({
    type: Array<Book>,
  })
  @UseGuards(AuthGuard)
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: Book,
  })
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<Book> {
    const book = await this.bookService.findOne(+id);
    if (book == null) {
      throw new NotFoundException();
    }
    return book;
  }

  @Patch(':id')
  @ApiResponse({
    type: Book,
  })
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.bookService.findOne(+id);
    if (book == null) {
      throw new NotFoundException();
    }
    return await this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    await this.bookService.remove(+id);
    return {};
  }
}
