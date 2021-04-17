import { Injectable } from '@nestjs/common';
import { Love } from 'src/entities/love.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class LoveService {

  constructor(
    @InjectRepository(Love)
    private loveRepository: Repository<Love>
  ) {}

  async postLove(req, res) {
    if(req.body.userId || req.body.ngoId) {
      const loveInfo = await this.loveRepository.findOne({
        userId: req.body.userId,
        ngoId: req.body.ngoId
      })
      if(!loveInfo) {
        await this.loveRepository.save(req.body)
        res.send("sucessful");
      } else {
        res.send("already loved");
      }
    } else {
      res.status(400).send("not authorization");
    }
  }

  async deleteLove(req, res) {
    if(req.body.userId || req.body.ngoId) {
      const loveInfo = await this.loveRepository.findOne({
        userId: req.body.userId,
        ngoId: req.body.ngoId
      });
      if(loveInfo) {
        await this.loveRepository.remove(loveInfo);
        res.send("Successfully deleted");
      } else {
        res.send("no one delete");
      }
    } else {
      res.status(400).send("not authorization");
    }
  }

}
