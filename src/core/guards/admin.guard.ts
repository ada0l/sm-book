import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user == null || user.name == null) {
      throw new ForbiddenException('123');
    }
    const userDb = await this.userRepository.findOneBy({ name: user.name });
    if (userDb == null) {
      throw new ForbiddenException('456');
    }
    return userDb.isAdmin;
  }
}
