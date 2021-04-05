import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller()
export class UserController {
  @Get()
  home() {
    return 'Welcome Home';
  }

  @Patch('/userinfo')
  editUserinfo() {
    
  }

  @Post('/login')
  login() {
    
  }

  @Post('/logout')
  logout(): string {
    return "This is logout"
  }
}
