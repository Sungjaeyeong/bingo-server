import { Body, Controller, Delete, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/testpage')
  getTestPage() {
  }

  @Get('/listpage')
  getListPage(): string {
    return "This is listpage info"
  }

  @Get('/contentpage')
  getContentPage(): string {
    return "This is contentpage info"
  }

  @Get('/mypage')
  getMyPage(): string {
    return "This is mypage info"
  }

  @Get('/paypage')
  getPayPage(): string {
    return "This is paypage info"
  }

  @Post('/login')
  login() {
    return this.appService.login();
  }

  @Post('/logout')
  logout(): string {
    return "This is logout"
  }

  @Post('/like')
  insertLike(): string {
    return "This is like"
  }

  @Post('/donation')
  insertDonation(): string {
    return "This is donation"
  }

  @Post('/pocket')
  insertPocket(): string {
    return "This is pocket"
  }

  @Patch('/donation')
  editDonation(): string {
    return "This is donation"
  }

  @Patch('/userinfo')
  editUserinfo() {
    
  }

  @Patch('/pocket')
  editPocket(): string {
    return "This is BINGO"
  }

  @Delete('/pocket')
  deletePocket(): string {
    return "This is BINGO"
  }

  @Delete('/like')
  deletelike(): string {
    return "This is BINGO"
  }
}
