import { Controller, Get, Patch, Post, Body, Res } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/googlelogin")
  googleLogin(@Body() bodyData, @Res() res) {
    return this.userService.googleLogin(bodyData, res);
  }

  @Post("/googlelogout")
  googleLogout(@Body() bodyData, @Res() res) {
    return this.userService.kakaoLogout(bodyData, res);
  }

  @Post("/kakaologin")
  kakaoLogin(@Body() bodyData, @Res() res) {
    return this.userService.kakaoLogin(bodyData, res);
  }

  @Post("/kakaologout")
  kakaologout(@Body() bodyData, @Res() res) {
    return this.userService.kakaoLogout(bodyData, res);
  }

  @Patch('/userinfo')
  editUserinfo() {
    
  }
}
