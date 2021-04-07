import { Inject, Injectable } from '@nestjs/common';
import axios from "axios";
import { GoogleUserDto } from 'src/dtos/user/google-user.dto';
import { User } from 'src/entities/user.entity';
const qs = require("querystring");

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
  ) {}

  // 구글 access_token 검사
  async checkAuth(req, response) {
    if (req.cookies.accessToken) {
      const accessToken = req.cookies.accessToken;
      await axios
        .get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
        .then(async (res) => {
          const userInfoDB = this.getUserInfo(accessToken);

          if (res.data.expires_in > 0) {
            response.status(200).send({ 
              data: { 
                id: (await userInfoDB).id, 
                username: (await userInfoDB).username, 
                profileImage: (await userInfoDB).profileImage 
              }
            })
          } else {
            const isExpiredRefreshToken = this.getAccessToken((await userInfoDB).refreshToken, (await userInfoDB).id);
            if(isExpiredRefreshToken) response.send('RefreshToken is expired');
          }
        })
        .catch(err => console.log('checkAuth err'))

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
      where: { accessToken, }
    })
    return userInfoDB;
  }

  // 구글 access_token 받아오기
  async getAccessToken(refresh_token: string, userId: number) {
    await axios
      .post("https://oauth2.googleapis.com/token", {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token,
        grant_type: "refresh_token",
      })
      .then(async (res) => {
        this.updateAccessToken(res.data.access_token, userId);
        return false;
      })
      .catch(err => true)
  }

  // DB에서 refreshToken 갱신
  async updateRefreshToken(refreshToken: string, id: number) {
    await this.userRepository.update({ refreshToken }, {
      where: {
        id
      }
    });
  }

  // DB에서 accessToken 갱신
  async updateAccessToken(accessToken: string, id: number) {
    await this.userRepository.update({ accessToken }, {
      where: {
        id
      }
    });
  }

  // DB에 유저정보 저장
  async insertUser(username: string, profileImage: string, googleId = null, kakaoId = null, accessToken: string, refreshToken: string) {
    await this.userRepository.create(<User>({
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
          where: { googleId: userInfoGoogle.sub, }
        })
  
        if (!userInfoDB) {
          this.insertUser(userInfoGoogle.name, userInfoGoogle.picture, userInfoGoogle.sub, null, accessToken, refreshToken);
        } else {
          if (refreshToken) {
            this.updateRefreshToken(refreshToken, userInfoDB.id)
          }
        }
      })
      .catch(err => console.log('getGoogleInfo err'))
  }

  async goolgeLogout(bodyData, res) {
    console.log("logout_token:", bodyData.access_token);
    if (bodyData.access_token) {
      await axios
        .post("https://accounts.google.com/logout", {
          headers: {
            Authorization: `Bearer ${bodyData.access_token}`,
          },
        })
        .then(res.send("로그아웃 성공!!!!!"))
        .catch(err => console.log('goolgeLogout err'));
    }
  }

  async kakaoLogin(bodyData, res) {
    const body = qs.stringify({
      client_id: "1f6fa43748f197dd179b4768a677578d",
      code: bodyData.authorizationCode,
      redirect_uri: "https://localhost:3000",
      grant_type: "authorization_code",
    });
    await axios
      .post("https://kauth.kakao.com/oauth/token", body)
      .then(response => {
        this.getKakaoInfo(response.data.access_token);
        res.status(200).send({ accessToken: response.data.access_token });
      })
      .catch(err => console.log('kakaoLogin err'));
  }

  getKakaoInfo = async (token: string) => {
    console.log(token)
    await axios
    .get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => {
      const userInfoKakao = res.data;
      const userInfoDB: User = await this.userRepository.findOne({
        where: { kakaoId: userInfoKakao.id, }
      })
      console.log(userInfoKakao.properties)
      if (!userInfoDB) {
        // this.insertUser(userInfoKakao.properties.nickname, userInfoKakao.properties.profile_image, null, userInfoKakao.id);
      }
    })
    .catch(err => console.log(err));
  }

  async kakaoLogout(bodyData, res) {
    console.log("logout_token:", bodyData.access_token);
    if (bodyData.access_token) {
      await axios
        .post("https://kapi.kakao.com/v1/user/logout", {
          headers: {
            Authorization: `Bearer ${bodyData.access_token}`,
          },
        })
        .then(res.send("로그아웃 성공!!!!!"))
        .catch(err => console.log('kakaoLogout err'));
    }
  }
}
