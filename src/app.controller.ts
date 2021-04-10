import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/testpage")
  getTestPage(@Req() req): boolean {
    return this.appService.getTestPage(req);
  }

  @Get("/listpage")
  getListPage() {
    return this.appService.getListPage();
  }

  @Get("/contentpage")
  getContentPage() {
    return this.appService.getContentPage();
  }

  @Get("/mypage")
  getMyPage() {
    return this.appService.getMyPage();
  }
}
