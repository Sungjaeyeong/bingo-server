import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller()
export class PocketController {
  @Get()
  home() {
    return 'Welcome Home';
  }

  @Get('/paypage')
  getPayPage(): string {
    return "This is paypage info"
  }

  @Post('/pocket')
  insertPocket(): string {
    return "This is pocket"
  }

  @Patch('/pocket')
  editPocket(): string {
    return "This is BINGO"
  }

  @Delete('/pocket')
  deletePocket(): string {
    return "This is BINGO"
  }
}
