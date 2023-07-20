import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { AUTH_CONFIG_KEY, AuthConfig } from 'src/config/auth.config';

@Injectable()
export class AuthService {
  private salt: string;

  constructor(
    private readonly configService: ConfigService<{
      [AUTH_CONFIG_KEY]: AuthConfig;
    }>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    const { salt } = configService.get(AUTH_CONFIG_KEY);
    this.salt = salt;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('Password or email is invalid.');
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    return this.getAccessTokenForUser(user);
  }

  async register(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, this.salt);
    const user = await this.usersService.create({ email, passwordHash });

    return this.getAccessTokenForUser(user);
  }

  private getAccessTokenForUser(user: User) {
    const payload = { username: user.email, sub: user.id };

    return this.jwtService.sign(payload);
  }
}
