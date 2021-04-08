import { Controller, Get, Patch, Post, Body, Res, Req } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/checkgoogleauth")
  checkGoogleAuth(@Req() req, @Res() res) {
    return this.userService.checkGoogleAuth(req, res);
  }

  @Get("/checkkakaoauth")
  checkKakaoAuth(@Req() req, @Res() res) {
    return this.userService.checkKakaoAuth(req, res);
  }

  @Post("/googlelogin")
  googleLogin(@Body() bodyData, @Res() res) {
    return this.userService.googleLogin(bodyData, res);
  }

  @Post("/kakaologin")
  kakaoLogin(@Body() bodyData, @Res() res) {
    return this.userService.kakaoLogin(bodyData, res);
  }

  @Post("/logout")
  logout(@Req() req, @Res() res) {
    return this.userService.logout(req, res);
  }

  @Patch('/userinfo')
  editUserinfo() {
    
  }
}
