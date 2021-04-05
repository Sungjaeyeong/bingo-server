import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async googleLogin(bodyData, res) {

  if (bodyData.authorizationCode) {
    await axios.post('https://accounts.google.com/o/oauth2/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: bodyData.authorizationCode,
      redirect_uri: 'https://localhost:3000',
      grant_type: 'authorization_code'
    },)
    .then(response => {
      res.status(200).send({ accessToken: response.data.access_token });
    })
    .catch(err => console.log('err'))
    }
  }

}
