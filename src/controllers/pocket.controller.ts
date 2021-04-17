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
import { PocketService } from "src/services/pocket.service";

@Controller()
export class PocketController {
  constructor(private readonly pocketService: PocketService) {}

  @Get("/paypage")
  getPayPage(@Req() req, @Res() res) {
    return this.pocketService.getPaypage(req, res);
  }

  @Post("/pocket")
  insertPocket(@Body() bodyData, @Res() res) {
    return this.pocketService.insertPocket(bodyData, res);
  }

  @Patch("/pocket")
  editPocket(@Req() req, @Res() res) {
    return this.pocketService.editPocket(req, res);
  }

  @Delete("/pocket")
  deletePocket(@Req() req, @Res() res) {
    return this.pocketService.deletePocket(req, res);
  }
}
