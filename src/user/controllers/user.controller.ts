import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userServcie: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  me(@Req() req) {
    return req.user;
  }
}
