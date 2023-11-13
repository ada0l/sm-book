import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public findOne(name: string): Promise<User | null> {
    return this.userRepository.findOneBy({ name });
  }

  @ApiResponse({
    type: User,
  })
  public async createOne(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      name: userDto.name,
      hashedPassword: await bcrypt.hash(userDto.password, 10),
    });
    return await this.userRepository.save(user);
  }
}
