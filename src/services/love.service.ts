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
    if(req.body.userId && req.body.ngoId) {
      const loveInfo = await this.loveRepository.findOne({
        userId: req.body.userId,
        ngoId: req.body.ngoId
      })
      if(!loveInfo) {
        await this.loveRepository.save(req.body)
        .catch(() => res.status(400).send("Failed"))
        res.send("Successfully recorded");
      } else {
        res.status(400).send("already exists");
      }
    } else {
      res.status(422).send("Required parameters are insufficient");
    }
  }

  async deleteLove(req, res) {
    if(req.body.userId && req.body.ngoId) {
      const loveInfo = await this.loveRepository.findOne({
        userId: req.body.userId,
        ngoId: req.body.ngoId
      });
      if(loveInfo) {
        await this.loveRepository.remove(loveInfo)
        .catch(() => res.status(400).send("Failed"))
        res.send("Successfully deleted");
      } else {
        res.status(404).send("no one delete");
      }
    } else {
      res.status(422).send("Required parameters are insufficient");
    }
  }

}
