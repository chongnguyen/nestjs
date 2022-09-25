import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from './services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY_JWT,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne({
      username: payload.username,
      password: payload.password,
    });

    if (user) {
      return user.toJSON();
    }
    return null;
  }
}
