import { Controller, Delete, Get, Post, Res, Req } from '@nestjs/common';
import { LoveService } from "src/services/love.service";

@Controller()
export class LikeController {
  constructor(private readonly loveService: LoveService) {}

  @Post('/love')
  insertLike(@Req() req, @Res() res) {
    return this.loveService.postLove(req, res);
  }

  @Delete('/love')
  deletelike(@Req() req, @Res() res) {
    return this.loveService.deleteLove(req, res);
  }
}
