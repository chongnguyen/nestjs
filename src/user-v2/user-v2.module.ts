import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './models/user.model';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: userSchema, name: 'User' }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRETKEY_JWT,
    }),
  ],
  providers: [UserService, AuthService, JwtService, JwtStrategy],
  controllers: [AuthController, UserController],
})
export class UserV2Module {}
