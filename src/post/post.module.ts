import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './model/post.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: postSchema }])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
