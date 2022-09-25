import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    return this.authService.login(username, password);
  }

  @Post('register')
  register(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    return this.authService.register(username, password);
  }
}
