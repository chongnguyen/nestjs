import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async findOne(username: string) {
    return this.UserModel.findOne({ username });
  }

  create(username: string, password: string) {
    const user = new this.UserModel({ username, password });
    return user.save();
  }

  update(username: string, data: any) {
    return this.UserModel.updateOne({ username }, data, { new: true });
  }
}
