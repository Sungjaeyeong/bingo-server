import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pocket } from "src/entities/pocket.entity";
import { Repository } from "typeorm";

@Injectable()
export class PocketService {
  constructor(
    @InjectRepository(Pocket)
    private pocketRepository: Repository<Pocket>
  ) {}

  async getPaypage(req, res) {
    const payInfo = await this.pocketRepository.find();
    console.log("check_paypage:", payInfo);
    res.send({ data: payInfo });
  }

  async insertPocket(bodyData, res) {
    console.log("check_ccccc:", bodyData);
    const insertedInfo = await this.pocketRepository.save(bodyData);
    res.send("Successfully recorded");
  }

  async editPocket(req, res) {
    console.log("reqSSSSS:", req.body);
    const user = await this.pocketRepository.findOne({
      id: req.body.id,
    });
    user.money = req.body.money;
    await this.pocketRepository.save(user);
    res.send("Successfully recorded");
  }

  async deletePocket(req, res) {
    const user = await this.pocketRepository.findOne({
      id: req.body.id,
    });
    await this.pocketRepository.delete(user);
    res.send("Successfully deleted");
  }
}
