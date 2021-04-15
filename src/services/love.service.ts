import { Injectable } from '@nestjs/common';

@Injectable()
export class LoveService {
  getHello(): string {
    return 'Hello World!';
  }

}
