import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  findAll(query: any = {}): Promise<User[]> {
    return this.UserModel.find(query).exec();
  }

  findOne(query: any = {}): Promise<User> {
    return this.UserModel.findOne(query).exec();
  }

  create(user: any): Promise<User> {
    return new this.UserModel(user).save();
  }

  update(query: any = {}, user: any): Promise<User> {
    return this.UserModel.findOneAndUpdate(query, user, { new: true }).exec();
  }
}
