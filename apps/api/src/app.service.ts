import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      name: 'CryptoPredict API',
      version: '0.0.1',
    };
  }
}
