import { Controller, Delete, Get, Patch, Post, Req, Res, } from '@nestjs/common';
import { DonateService } from "src/services/donate.service";

@Controller()
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @Post('/donation')
  insertDonation(@Req() req, @Res() res) {
    return this.donateService.postDonate(req, res);
  }

  @Patch('/donation')
  editDonation(@Req() req, @Res() res) {
    return this.donateService.patchDonate(req, res);
  }
}
