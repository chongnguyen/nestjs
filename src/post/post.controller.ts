import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string | number) {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string | number) {
    return this.postService.remove(id);
  }
}
