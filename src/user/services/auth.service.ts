import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user) {
      const { ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== pass) {
      throw new Error('Password is incorrect');
    }

    const token = await this.createToken(user);
    console.log({ token });
    return { ...token, user };
  }

  async register(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user) {
      throw new Error('User already exists');
    }

    return this.userService.create(username, pass);
  }

  private async createToken({ username }: User, refresh = true) {
    const accessToken = this.jwtService.sign(
      { username },
      { expiresIn: process.env.EXPIRESIN, secret: process.env.SECRETKEY_JWT },
    );

    if (refresh) {
      const refreshToken = this.jwtService.sign(
        { username },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRESIN_REFRESH,
        },
      );
      await this.userService.update(username, {
        refreshToken,
      });

      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.EXPIRESIN_REFRESH,
      };
    } else {
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
      };
    }
  }
}
