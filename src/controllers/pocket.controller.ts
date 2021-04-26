import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { PocketService } from "src/services/pocket.service";

@Controller()
export class PocketController {
  constructor(private readonly pocketService: PocketService) {}

  @Get("/paypage")
  getPayPage(@Query("user_id") userId, @Headers() headers, @Res() res) {
    return this.pocketService.getPaypage(userId, headers, res);
  }

  @Post("/pocket")
  insertPocket(@Body() bodyData, @Res() res) {
    return this.pocketService.insertPocket(bodyData, res);
  }

  @Patch("/pocket")
  editPocket(@Body() bodyData, @Res() res) {
    return this.pocketService.editPocket(bodyData, res);
  }

  @Delete("/pocket")
  deletePocket(@Headers() headers, @Body() bodyData, @Res() res) {
    return this.pocketService.deletePocket(headers, bodyData, res);
  }
}
