import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeService {
  getHello(): string {
    return 'Hello World!';
  }

}
