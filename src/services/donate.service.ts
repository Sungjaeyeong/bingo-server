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
    if((data.userId && data.ngoId && data.money && data.type && data.ing)) {
      let now = new Date();
      const curTime = dateFormat(now, "isoDateTime");
      req.body.createdAt = curTime;
      await this.donateRepository.save(req.body)
      .catch(() => res.status(404).send("Failed"))
      res.send("Successfully recorded");
    } else {
      res.status(422).send("Required parameters are insufficient")
    }
  }

  async patchDonate(req, res) {
    if (!(req.body.donateId && req.body.ing)) return res.status(422).send("Required parameters are insufficient");
    const donateInfo = await this.donateRepository.findOne({
      id: req.body.donateId
    })
    if(donateInfo) {
      donateInfo.ing = req.body.ing;
      let now = new Date();
      donateInfo.updatedAt = dateFormat(now, "isoDateTime"); 
      await this.donateRepository.save(donateInfo)
      .catch(() => res.status(400).send("Failed"))
      res.send("Successfully recorded");
    } else {
      res.status(404).send("donateInfo not found");
    }
  }

}
