import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pocket } from "src/entities/pocket.entity";
import { User } from 'src/entities/user.entity';
import { Repository } from "typeorm";

@Injectable()
export class PocketService {
  constructor(
    @InjectRepository(Pocket)
    private pocketRepository: Repository<Pocket>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getPaypage(userId, res) {
    if (!userId) return res.status(422).send('Required parameters are insufficient');
    const pocketInfo = await this.pocketRepository.find({
      where: {
        userId,
      },
      relations: ["ngo"]
    });
    res.send(pocketInfo);
  }

  async insertPocket(bodyData, res) {
    if (!(bodyData.userId && bodyData.ngoId && bodyData.type && bodyData.money)) return res.status(422).send('Required parameters are insufficient');
    const pocketInfo = await this.pocketRepository.findOne({
      where: {
        userId: bodyData.userId,
        ngoId: bodyData.ngoId,
      }
    })
    if (pocketInfo) { 
      res.send("Already Exists") 
    } else {
      await this.pocketRepository.save(bodyData)
      .catch(() => res.send("Failed"))
      res.send("Successfully recorded")
    }
  }

  async editPocket(bodyData, res) {
    if (!(bodyData.userId && bodyData.ngoId && bodyData.type && bodyData.money)) return res.status(422).send('Required parameters are insufficient');
    const { userId, ngoId, type, money } = bodyData;
    const pocketInfo = await this.pocketRepository.findOne({
      where: {
        userId,
        ngoId,
      }
    })
    if (!pocketInfo) {
      res.status(404).send('Not Found');
    } else {
      pocketInfo.type = type;
      pocketInfo.money = money;
      await this.pocketRepository.save(pocketInfo)
      .catch(() => res.send("Failed"))
      res.send("Successfully updated")
    }
  }

  async deletePocket(bodyData, res) {
    if (!bodyData.pocketId) return res.status(422).send('Required parameters are insufficient');
    const pocketInfo = await this.pocketRepository.findOne({
      id: bodyData.pocketId
    });
    if (pocketInfo) {
      await this.pocketRepository.delete(pocketInfo);
      res.send("Successfully deleted");
    } else {
      res.status(404).send('Not Found');
    }
  }
}
