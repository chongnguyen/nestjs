import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const foundUser = await this.userService.findOne({ username });
    if (foundUser && foundUser.password === password) {
      return foundUser.toJSON();
    }
    return null;
  }

  async register(user: AuthDto) {
    const { username } = user;

    const foundUser = await this.userService.findOne({ username });

    if (foundUser) {
      throw new Error('User already exists');
    }

    const newUser = await this.userService.create(user);

    const token = await this.generateToken(newUser.toJSON());

    return {
      ...token,
      user: newUser,
    };
  }

  async login(user: AuthDto) {
    const { username, password } = user;

    const foundUser = await this.userService.findOne({ username });

    if (!foundUser) {
      throw new Error('User not found');
    }

    if (foundUser.password !== password) {
      throw new Error('Password is incorrect');
    }

    const token = await this.generateToken(foundUser.toJSON());

    return {
      ...token,
      user: foundUser,
    };
  }

  private async generateToken(payload: any, refesh = true) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.SECRETKEY_JWT,
    });

    if (!refesh) {
      return { accessToken };
    }

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.SECRETKEY_REFRESH,
    });

    await this.userService.update({ _id: payload._id }, { refreshToken });
    return { accessToken, refreshToken };
  }
}
