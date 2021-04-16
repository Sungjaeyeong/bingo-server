import { Controller, Get, Param, Query, Req, Res } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/testcookie")
  getTestCookie(@Req() req): boolean {
    return this.appService.getTestCookie(req);
  }

  @Get("/testpage")
  getTestPage(@Query("options") options) {
    return this.appService.getTestPage(options);
  }

  @Get("/listpage")
  getListPage(@Res() res) {
    return this.appService.getListPage(res);
  }

  @Get("/contentpage/:ngo_id")
  getContentPage(@Param("ngo_id") ngoId: number, @Res() res) {
    return this.appService.getContentPage(ngoId, res);
  }

  @Get("/mypage")
  getMyPage(@Query("user_id") userId) {
    return this.appService.getMyPage(userId);
  }
}
