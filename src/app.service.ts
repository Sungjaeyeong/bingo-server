import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Ngo } from './entities/ngo.entity';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Ngo) private ngoRepository: Repository<Ngo>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  getTestPage(req) {
    if (req.cookies.test) {
      return true;
    } else {
      return false;
    }
  }

  async getListPage(res) {
    const ngoInfoDB = await this.ngoRepository.find({
      relations: ["ngocategorys", "ngocategorys.category"]
    });
    res.send({ data: ngoInfoDB });
  }

  async getContentPage(ngoId, res) {
    
    
  }

  

  async getMyPage(userId) {
    
  }
}
