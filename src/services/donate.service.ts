import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Donate } from 'src/entities/donate.entity';
import { Repository } from "typeorm";
const dateFormat = require("dateformat");

@Injectable()
export class DonateService {

  constructor(
    @InjectRepository(Donate)
    private donateRepository: Repository<Donate>
  ) {}

  async postDonate(req, res) {
    const data = req.body;
    if(data.userId || data.ngoId || data.money || data.type || data.ing) {
      let now = new Date();
      const curTime = dateFormat(now, "isoDateTime");
      console.log(curTime);
      req.body.createdAt = curTime;
      await this.donateRepository.save(req.body);
      res.send("sucessful");
    } else {
      res.status(400).send("body data not authorization")
    }
  }

  async patchDonate(req, res) {
    const donateInfo = await this.donateRepository.findOne({
      id: req.body.donateId
    })
    if(donateInfo) {
      donateInfo.ing = req.body.ing;
      let now = new Date();
      donateInfo.updatedAt = dateFormat(now, "isoDateTime"); 
      await this.donateRepository.save(donateInfo);
      res.send("sucessful");
    } else {
      res.status(400).send("donateInfo not found");
    }
  }

}
