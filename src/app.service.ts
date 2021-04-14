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
    const ngoInfoDB = await this.ngoRepository.findOne({
      where: { id: ngoId },
      relations: ["ngocategorys", "ngocategorys.category"]
    });
    if (!ngoInfoDB) {
      res.status(404).send('Not Found');
    } else {
      const newsList = await this.getNews(ngoInfoDB.name);
      res.send({ data: ngoInfoDB, newsList, });
    }
    
  }

  async getNews(ngoName) {
    let sortNews = [];
    await axios
      .get(`https://openapi.naver.com/v1/search/news.json`,{
        params: {
          query: ngoName,
          display: 100,
        },
        headers: {
          'X-Naver-Client-Id' : "HqssrkcezIYM9NmnWQHs",
          'X-Naver-Client-Secret': "2UMTPrP4Ua",
        }
      })
      .then(res => {
        const newsList = res.data.items;
        if (newsList.length <= 4) return newsList;
        for (let news of newsList) {
          if (sortNews.length >= 4) break;
          if (news.title.includes(ngoName)) {
            sortNews.push();
          }
        }
        let i = newsList.length-1;
        while (sortNews.length <= 4) {
          sortNews.push(newsList[i]);
          i--;
        }
      })
      .catch(err => console.log(err))
    return sortNews;
  }

  async getMyPage(userId) {
    
  }
}
