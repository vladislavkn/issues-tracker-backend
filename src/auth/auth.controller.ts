import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { AuthUser } from './decorators/auth-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@AuthUser() user: User) {
    const accessToken = await this.authService.login(user);
    return { accessToken };
  }

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const accessToken = await this.authService.register(email, password);
    return { accessToken };
  }
}
