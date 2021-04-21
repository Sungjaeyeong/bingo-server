import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Donate } from 'src/entities/donate.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from "typeorm";
const dateFormat = require("dateformat");

@Injectable()
export class DonateService {

  constructor(
    @InjectRepository(Donate)
    private donateRepository: Repository<Donate>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async postDonate(req, res) {
    const data = req.body;
    if(!data.accessToken) return res.status(403).send("No permission");
    if((data.userId && data.ngoId && data.money && data.type && data.ing)) {
      let now = new Date();
      const curTime = dateFormat(now, "isoDateTime");
      req.body.createdAt = curTime;
      await this.donateRepository.save(req.body)
      .then(async () => {
        res.send("Successfully recorded");
        const userDonates = await this.donateRepository.find({
          userId: data.userId
        })
        const moneySum = userDonates.reduce((a, c) => {
          return a + c.money;
        }, 0);
        const userInfoDB: User = await this.userRepository.findOne({
          id: data.userId,
        })
        let level = "씨앗";
        switch (Math.floor(moneySum/100000)) {
          case 1: 
            level = "새싹";
            break;
          case 2: 
            level = "어린나무";
            break;
          case 3: 
            level = "큰나무";
            break;
          case 4: 
            level = "꽃";
            break;
          case 5: 
            level = "열매";
            break;
          default:
            level = "씨앗";
        }
        userInfoDB.level = level;
        await this.userRepository.save(userInfoDB);
      })
      .catch(() => res.status(404).send("Failed"))
      
    } else {
      res.status(422).send("Required parameters are insufficient")
    }
  }

  async patchDonate(req, res) {
    if(!req.body.accessToken) return res.status(403).send("No permission");
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
