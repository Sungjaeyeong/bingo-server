import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

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

  getListPage() {
    
  }

  getContentPage() {
    
  }

  getMyPage() {
    
  }
}
