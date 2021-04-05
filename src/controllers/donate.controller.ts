import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller()
export class DonateController {
  @Get()
  home() {
    return 'Welcome Home';
  }

  @Post('/donation')
  insertDonation(): string {
    return "This is donation"
  }

  @Patch('/donation')
  editDonation(): string {
    return "This is donation"
  }
}
