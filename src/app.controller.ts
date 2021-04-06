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
