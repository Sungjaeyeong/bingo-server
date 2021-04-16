import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller()
export class LikeController {
  @Get()
  home() {
    return 'Welcome Home';
  }

  @Post('/like')
  insertLike(): string {
    return "This is like"
  }

  @Delete('/like')
  deletelike(): string {
    return "This is BINGO"
  }
}
