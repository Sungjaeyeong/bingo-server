import { Injectable } from "@nestjs/common";
import axios from "axios";
const qs = require("querystring");
import queryStringify from "qs-stringify";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
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
          res.status(200).send({ accessToken: response.data.access_token });
        })
        .catch(err => console.log("err"));
    }
  }

  async kakaoLogin(bodyData, res) {
    const body = qs.stringify({
      client_id: "1f6fa43748f197dd179b4768a677578d",
      code: bodyData.authorizationCode,
      redirect_uri: "https://localhost:3000",
      grant_type: "authorization_code",
    });

    console.log(bodyData.authorizationCode);
    await axios
      .post("https://kauth.kakao.com/oauth/token", body)

      .then(response => {
        console.log("accesstoken:", response.data.access_token);
        axios
          .get("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          })
          .then(res => {
            console.log("get_data_check:", res.data);
          })
          .catch(err => console.log(err));
        res.status(200).send({ accessToken: response.data.access_token });
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
        .catch(err => console.log(err));
    }
  }
}
