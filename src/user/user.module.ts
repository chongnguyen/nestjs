import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { userSchema } from './model/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRETKEY_JWT,
      signOptions: { expiresIn: process.env.EXPIRESIN },
    }),
  ],
  providers: [UserService, AuthService, JwtService, JwtStrategy],
  controllers: [UserController, AuthController],
})
export class UserModule {}
