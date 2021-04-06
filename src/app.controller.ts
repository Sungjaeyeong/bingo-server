import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/googlelogin")
  googleLogin(@Body() bodyData, @Res() res) {
    return this.appService.googleLogin(bodyData, res);
  }

  @Post("/kakaologin")
  kakaoLogin(@Body() bodyData, @Res() res) {
    return this.appService.kakaoLogin(bodyData, res);
  }

  @Post("/kakaologout")
  kakaologout(@Body() bodyData, @Res() res) {
    return this.appService.kakaoLogout(bodyData, res);
  }

  @Get("/testpage")
  getTestPage() {}

  @Get("/listpage")
  getListPage(): string {
    return "This is listpage info";
  }

  @Get("/contentpage")
  getContentPage(): string {
    return "This is contentpage info";
  }

  @Get("/mypage")
  getMyPage(): string {
    return "This is mypage info";
  }
}
