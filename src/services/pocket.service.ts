import { Injectable } from '@nestjs/common';

@Injectable()
export class PocketService {
  getHello(): string {
    return 'Hello World!';
  }

}
