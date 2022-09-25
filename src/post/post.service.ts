import { Injectable } from '@nestjs/common';
import { Post } from './model/post.model';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/post.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly PostModel: Model<Post>) {}

  findAll() {
    return this.PostModel.find();
  }

  async findOne(id: string | number) {
    const post = await this.PostModel.findById(id);
    console.log({ title: post.title });

    return post;
  }

  create(body: CreatePostDto) {
    console.log({ body });
    const post = new this.PostModel(body);
    console.log({ post });
    return post.save();
  }

  async remove(id: string | number) {
    await this.PostModel.findByIdAndRemove(id);
    return true;
  }
}
