import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { In, Repository } from 'typeorm';
import { Ngo } from './entities/ngo.entity';
import { NgoCategory } from './entities/ngocategory.entity';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Ngo) private ngoRepository: Repository<Ngo>,
    @InjectRepository(NgoCategory) private ngocategoryRepository: Repository<NgoCategory>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  getTestCookie(req) {
    if (req.cookies.test) {
      return true;
    } else {
      return false;
    }
  }

  async getTestPage(options, res) {
    options = JSON.parse(options)
    const ngocategoryInfoDB = await this.ngocategoryRepository.find({
      where: {
        categoryId: In(options.selectedOptions)
      }
    });
    const ngoIndexs = ngocategoryInfoDB.map(el => el.ngoId);
    const ngoDB = await this.ngoRepository.find({
      where: {
        id: In(ngoIndexs)
      },
      relations: ["ngocategorys"]
    });

    let ngocategoryIds = [];
    for (let ngoIdx=0; ngoIdx<ngoDB.length; ngoIdx++) {
      let categoryIds = [];
      for (let i=0; i<ngoDB[ngoIdx].ngocategorys.length; i++) {
        categoryIds.push(ngoDB[ngoIdx].ngocategorys[i].categoryId)
      }
      ngocategoryIds.push([ngoDB[ngoIdx].id, categoryIds]);
    }

    let max = 0;
    let countArray = [];
    for (let el of ngocategoryIds) {
      let count = 0;
      for(let i=0; i<el[1].length; i++) {
        if(options.postOptions.includes(el[1][i])) count++;
      }
      countArray.push([el[0], count]);
      if (count > max) max = count;
    }
    const resultList = countArray.filter(el => el[1] === max);
    const idOfresultList = resultList.map(el => el[0]);
    const resultIdx = Math.floor(Math.random() * resultList.length);
    const ngoId = resultList[resultIdx][0];
    res.cookie('test', 'yes', {
      domain: 'ibingo.link',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    if (options.postOrder) {
      res.send(await this.ngoRepository.findOne({
        where: {
          id: In(idOfresultList)
        },
        order: {
          since: 'DESC'
        }
      }))
    } else {
      res.send(await this.ngoRepository.findOne({
        where: {
          id: ngoId
        }
      }))
    }
  }

  async getListPage(res) {
    const ngoInfoDB = await this.ngoRepository.find({
      relations: ["ngocategorys", "ngocategorys.category"]
    });
    res.send({ data: ngoInfoDB });
  }

  async getContentPage(ngoId, res) {
    if (!ngoId) return res.status(422).send('Required parameters are insufficient');
    const ngoInfoDB = await this.ngoRepository.findOne({
      where: { id: ngoId },
      relations: ["donates.user", "donates", "ngocategorys", "ngocategorys.category"]
    });
    if (!ngoInfoDB) {
      res.status(404).send('Not Found');
    } else {
      const newsList = await this.getNews(ngoInfoDB.name);
      const message = ngoInfoDB.donates.slice(0, 3);
      const messageList = message.map(el => {
        return {...el, user: {
          username: el.user.username,
          profileImage: el.user.profileImage,
          level: el.user.level
        }}
      })
      delete ngoInfoDB.donates;
      res.send({ data: ngoInfoDB, newsList, messageList });
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
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
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
        while (sortNews.length < 4) {
          sortNews.push(newsList[i]);
          i--;
        }
      })
      .catch(err => console.log(err))
    return sortNews;
  }

  async getMyPage(headers, userId) {
    if (!headers.authorization) return 'No permission';
    if (!userId) return 'Required parameters are insufficient';
    const userInfoDB = await this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: ["loves", "loves.ngo", "loves.ngo.ngocategorys", "loves.ngo.ngocategorys.category", "donates", "donates.ngo", "donates.ngo.ngocategorys", "donates.ngo.ngocategorys.category"]
    });
    if (!userInfoDB) {
      return 'Not Found';
    } else {
      const loves = userInfoDB.loves.map(el => {
        return {
          ngoId: el.ngo.id,
          ngoName: el.ngo.name,
          categoryName: el.ngo.ngocategorys.map(category => category.category.name)
        }
      })
      const donates = userInfoDB.donates.map(el => {
        return {
          donateId: el.id,
          money: el.money,
          createdAt: el.createdAt,
          updatedAt: el.updatedAt,
          type: el.type,
          ing: el.ing,
          ngo: {
            ngoId: el.ngo.id,
            ngoName: el.ngo.name,
            categoryName: el.ngo.ngocategorys.map(category => category.category.name)
          }
        }
      })
      return {
        loves,
        donates,
      }
    }
  }
}
