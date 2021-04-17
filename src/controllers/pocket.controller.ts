import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
} from "@nestjs/common";
import { PocketService } from "src/services/pocket.service";

@Controller()
export class PocketController {
  constructor(private readonly pocketService: PocketService) {}

  @Get("/paypage")
  getPayPage(@Query("user_id") userId, @Res() res) {
    return this.pocketService.getPaypage(userId, res);
  }

  @Post("/pocket")
  insertPocket(@Body() bodyData, @Res() res) {
    return this.pocketService.insertPocket(bodyData, res);
  }

  @Put("/pocket")
  editPocket(@Body() bodyData, @Res() res) {
    return this.pocketService.editPocket(bodyData, res);
  }

  @Delete("/pocket")
  deletePocket(@Body() bodyData, @Res() res) {
    return this.pocketService.deletePocket(bodyData, res);
  }
}
