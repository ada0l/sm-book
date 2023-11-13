import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, password: string): Promise<any> {
    const user = await this.userService.findOne(name);
    if (user == null) {
      throw new UnauthorizedException('User does not exist');
    }
    if (!(await bcrypt.compare(password, user.hashedPassword))) {
      throw new UnauthorizedException('Passwords are not matched');
    }
    const payload = { name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
