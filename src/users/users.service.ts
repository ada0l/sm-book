import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findOne(name: string): Promise<User | null> {
    return this.userRepository.findOneBy({ name });
  }

  createOne(name: string, hashedPassword: string): Promise<User> {
    const user = this.userRepository.create({ name, hashedPassword });
    return this.userRepository.save(user);
  }
}
