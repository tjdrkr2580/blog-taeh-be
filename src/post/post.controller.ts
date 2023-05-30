import { Body, Controller, Post, Req, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDtoCreateDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  create(@Req() req, @Body() dto: PostDtoCreateDto) {
    return this.postService.create(req, dto);
  }

  @Get('')
  get() {
    return this.postService.get();
  }

  @Get(':title')
  getParams(@Param('title') title: string) {
    return this.postService.getParams(title);
  }
}
