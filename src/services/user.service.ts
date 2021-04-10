import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from "axios";
import { GoogleUserDto } from 'src/dtos/user/google-user.dto';
import { User } from 'src/entities/user.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 카카오 access_token 검사
  async checkKakaoAuth(req, response) {
    if (req.cookies.k_accessToken) {
      const accessToken: string = req.cookies.k_accessToken;
      await axios
      .get("https://kapi.kakao.com/v1/user/access_token_info", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(async (res) => {
        // console.log(res.data)
        // const userInfoDB = this.getUserInfo(accessToken);
        // response.status(200).send({ 
        //   data: { 
        //     id: (await userInfoDB).id, 
        //     username: (await userInfoDB).username, 
        //     profileImage: (await userInfoDB).profileImage 
        //   }
        // })
        const userInfoDB = this.getUserInfo(accessToken);
        this.getKakaoAccessToken((await userInfoDB).refreshToken, (await userInfoDB).id)
        .then(async (newAccessToken) => {
          response.cookie('k_accessToken', newAccessToken, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none'
          });
          response.status(200).send({ 
            data: { 
              id: (await userInfoDB).id, 
              username: (await userInfoDB).username, 
              profileImage: (await userInfoDB).profileImage 
            }
          })
        })
        .catch(async () => {
          response.send('RefreshToken is expired');
        })
      })
      .catch(async () => {
        const userInfoDB = this.getUserInfo(accessToken);
        this.getKakaoAccessToken((await userInfoDB).refreshToken, (await userInfoDB).id)
        .then(async (newAccessToken) => {
          response.cookie('k_accessToken', newAccessToken, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none'
          });
          response.status(200).send({ 
            data: { 
              id: (await userInfoDB).id, 
              username: (await userInfoDB).username, 
              profileImage: (await userInfoDB).profileImage 
            }
          })
        })
        .catch(async () => {
          response.send('RefreshToken is expired');
        })
      })
    } else {
      response.status(200).send({ 
        data: { 
          id: null, 
          username: null,
          profileImage: null
        }
      })
    }
  }

  // 카카오 access_token 받아오기
  async getKakaoAccessToken(refresh_token: string, userId: number) {
    let accessToken: string;
    await axios
    .post("https://kauth.kakao.com/oauth/token", {}, {
      params: {
        client_id: process.env.KAKAO_CLIENT_ID,
        refresh_token,
        grant_type: "refresh_token",
      }
    })
    .then(async (res) => {
      if (res.data.refresh_token) {
        this.updateRefreshToken(res.data.access_token, res.data.refresh_token, userId)
      } else {
        this.updateAccessToken(res.data.access_token, userId);
      }
      accessToken = res.data.access_token;
    })
    .catch(err => console.log(err))
    return accessToken;
  }

  // 구글 access_token 검사
  async checkGoogleAuth(req, response) {
    if (req.cookies.accessToken) {
      const accessToken = req.cookies.accessToken;
      await axios
      .get(`https://www.googleapis.com/oauth2/v1/tokeninfo`, {
        params: {
          access_token: accessToken
        }
      },)
      .then(async (res) => {
        const userInfoDB = this.getUserInfo(accessToken);
        response.status(200).send({ 
          data: { 
            id: (await userInfoDB).id, 
            username: (await userInfoDB).username, 
            profileImage: (await userInfoDB).profileImage 
          }
        })
        console.log(res.data)
      })
      .catch(async () => {
        const userInfoDB = this.getUserInfo(accessToken);
        this.getGoogleAccessToken((await userInfoDB).refreshToken, (await userInfoDB).id)
        .then(async (newAccessToken) => {
          response.cookie('accessToken', newAccessToken, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none'
          });
          response.status(200).send({ 
            data: { 
              id: (await userInfoDB).id, 
              username: (await userInfoDB).username, 
              profileImage: (await userInfoDB).profileImage 
            }
          })
        })
        .catch(async () => {
          response.send('RefreshToken is expired');
        })
      })
    } else {
      response.status(200).send({ 
        data: { 
          id: null, 
          username: null,
          profileImage: null
        }
      })
    }
  }

  // DB에서 유저정보 가져오기
  async getUserInfo(accessToken: string) {
    const userInfoDB: User = await this.userRepository.findOne({
      accessToken,
    })
    return userInfoDB;
  }

  // 구글 access_token 받아오기
  async getGoogleAccessToken(refresh_token: string, userId: number) {
    let accessToken: string;
    await axios
    .post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token,
      grant_type: "refresh_token",
    })
    .then(async (res) => {
      this.updateAccessToken(res.data.access_token, userId);
      accessToken = res.data.access_token;
    })
    .catch(err => console.log('getGoogleAccessToken err'))
    return accessToken;
  }

  // DB에서 refreshToken 갱신
  async updateRefreshToken(accessToken: string, refreshToken: string, id: number) {
    const userInfoDB = await this.userRepository.findOne({ id })
    userInfoDB.accessToken = accessToken;
    userInfoDB.refreshToken = refreshToken;
    await this.userRepository.save(userInfoDB);
  }

  // DB에서 accessToken 갱신
  async updateAccessToken(accessToken: string, id: number) {
    const userInfoDB = await this.userRepository.findOne({ id })
    userInfoDB.accessToken = accessToken;
    await this.userRepository.save(userInfoDB);
  }

  // DB에 유저정보 저장
  async insertUser(username: string, profileImage: string, googleId = null, kakaoId = null, accessToken: string, refreshToken: string) {
    await this.userRepository.save(({
      username,
      profileImage,
      googleId,
      kakaoId,
      accessToken,
      refreshToken
    }))
  }

  async googleLogin(bodyData, res) {
    if (bodyData.authorizationCode) {
      await axios
        .post("https://accounts.google.com/o/oauth2/token", {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code: bodyData.authorizationCode,
          redirect_uri: "https://localhost:3000",
          grant_type: "authorization_code",
        })
        .then(response => {
          this.getGoogleInfo(response.data.access_token, response.data.refresh_token);
          res.cookie('accessToken', response.data.access_token, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none'
          });
          res.status(200).send({ accessToken: response.data.access_token });
        })
        .catch(err => console.log("googleLogin err"));
    }
  }

  // 구글에서 정보 받아오기
  getGoogleInfo = async (accessToken: string, refreshToken?: string) => {
    await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(async (res) => {
        const userInfoGoogle: GoogleUserDto = res.data;
        const userInfoDB: User = await this.userRepository.findOne({
          googleId: userInfoGoogle.sub,
        })
  
        if (!userInfoDB) {
          this.insertUser(userInfoGoogle.name, userInfoGoogle.picture, userInfoGoogle.sub, null, accessToken, refreshToken);
        } else {
          if (refreshToken) {
            this.updateRefreshToken(accessToken, refreshToken, userInfoDB.id);
          } else {
            this.updateAccessToken(accessToken, userInfoDB.id);
          }
        }
      })
      .catch(err => console.log('getGoogleInfo err'))
  }

  async kakaoLogin(bodyData, res) {
    await axios
      .post("https://kauth.kakao.com/oauth/token",{} ,{
        params: {
          client_id: process.env.KAKAO_CLIENT_ID,
          code: bodyData.authorizationCode,
          redirect_uri: "https://localhost:3000",
          grant_type: "authorization_code",
        },
      })
      .then(response => {
        this.getKakaoInfo(response.data.access_token, response.data.refresh_token);
        res.cookie('k_accessToken', response.data.access_token, {
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        });
        res.status(200).send({ accessToken: response.data.access_token });
      })
      .catch(err => console.log('kakaoLogin err'));
  }

  // 카카오에서 정보 받아오기
  getKakaoInfo = async (accessToken: string, refreshToken: string) => {
    console.log(accessToken)
    await axios
    .get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(async (res) => {
      const userInfoKakao = res.data;
      const userInfoDB: User = await this.userRepository.findOne({
        kakaoId: userInfoKakao.id,
      })
      console.log(userInfoKakao.properties)
      if (!userInfoDB) {
        this.insertUser(userInfoKakao.properties.nickname, userInfoKakao.properties.profile_image, null, userInfoKakao.id, accessToken, refreshToken);
      } else {
        this.updateRefreshToken(accessToken, refreshToken, userInfoDB.id)
      }
    })
    .catch(err => console.log('getKakaoInfo err'));
  }

  async logout(req, res) {
    console.log('a')
    if (req.cookies.k_accessToken || req.cookies.accessToken) {
      res.clearCookie('k_accessToken', {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
      res.clearCookie('accessToken', {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
      // this.kakaoLogout(req.cookies.k_accessToken);
      res.send('logout')
    } else {
      res.status(400).send('Not logged in')
    }
  }

  async kakaoLogout(k_accessToken: string) {
    if (k_accessToken) {
      await axios
        .post("https://kapi.kakao.com/v1/user/logout", {
          headers: {
            Authorization: `Bearer ${k_accessToken}`,
          },
        })
        .catch(err => console.log('kakaoLogout err'));
    }
  }
}


